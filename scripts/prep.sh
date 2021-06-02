# prep.sh
# to be run once at setup 

set -e
set -x


if [ $EUID -ne 0 ]; then
	echo "Must be root"
	exit 1
fi


# get all the necessary debian packages
install_apt_packages() 
{
	apt-get update
	apt-get upgrade
	apt-get install -y \
		tmux \
		curl \
		apt-transport-https \
		ca-certificates \
		gnupg \
		lsb-release
}

# install docker, make drinkabse user part of group
get_docker()
{
	url=https://download.docker.com/linux/debian/gpg
	curl -fsSL $url | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
	echo \
	  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
	    $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
	apt-get update
	apt-get install -y docker-ce docker-ce-cli containerd.io
	usermod -aG docker drinkbase
	echo "docker installed at $(which docker)"

}

# install and configure docker-compose
get_docker_compose()
{

	url=https://github.com/docker/compose/releases/download/1.29.2/docker-compose-Linux-x86_64
	curl -L $url -o /usr/local/bin/docker-compose
	chmod +x /usr/local/bin/docker-compose
	ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose
	echo "docker-compose installed at $(which docker-compose)"

}

# print any messages
print_messages() 
{

	echo "\n"
	echo "reboot to get non-root access to docker cli"

}


# run the script
install_apt_packages
get_docker
get_docker_compose
print_messages

