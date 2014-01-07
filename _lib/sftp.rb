class SFTP

  attr_accessor :host, :port, :username, :password, :local_path, :remote_path

  class << self
    def deploy
      require 'net/ssh'
      require 'net/sftp'

      load_config

      Net::SSH.start(@host, @username, :password => @password) do |ssh|
        print "This operation will delete the [#{@host}#{@remote_path}] directory. Are you sure? Yes (No): "
        res = STDIN.gets
        if(/[yes|y|ys|ye]/.match res)
          ssh.exec!("rm -r #{@remote_path}")
          transfer_files
        end
      end
    end

    protected

    def transfer_files
      Net::SFTP.start(@host, @username, {:password => @password, :port => @port}) do |sftp|
        begin
          sftp.mkdir!(@remote_path)
        rescue Net::SFTP::StatusException
        end
        send_dir(sftp, @local_path, @remote_path)
      end
      puts ""
    end

    def load_config(username=nil, password=nil)
      require 'dotenv'
      Dotenv.load
      @host = ENV['SFTP_HOST']
      @port = ENV['SFTP_PORT']
      @username = username ||= ENV['SFTP_USERNAME']
      @password = password ||= ENV['SFTP_PASSWORD']
      @local_path = ENV['SFTP_LOCAL_PATH']
      @remote_path = ENV['SFTP_DESTINATION_PATH']
    end

    def send_dir(sftp, local, distant)
      Dir.foreach(local) do |file_name|
        next if file_name =~ /^(\.|\.\.)$/
        if ::File.stat("#{local}/#{file_name}").directory?
          begin
            sftp.mkdir!("#{distant}/#{file_name}")
          rescue Net::SFTP::StatusException
          end
          send_dir(sftp, "#{local}/#{file_name}", "#{distant}/#{file_name}")
        else
          sftp.upload!("#{local}/#{file_name}", "#{distant}/#{file_name}")
          print "."
        end
      end
    end
  end

end
