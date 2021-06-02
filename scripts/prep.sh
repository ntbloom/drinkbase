# prep.sh
# to be run once at setup 

set -e

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
		ufw \
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

# secure the server
configure_firewall()
{
	ufw enable
	ufw default deny incoming
	ufw allow 22
	ufw allow 80
	ufw allow 443

}

# print any messages
print_messages() 
{

	echo "\n"
	echo "Script complete!"
	echo "Reboot to get non-root access to docker cli"

}


# run the script
install_apt_packages

if [ ! -x /usr/bin/docker ]; then
	get_docker
fi
if [ ! -x /usr/local/bin/docker-compose ]; then
	get_docker_compose
fi
#configure_firewall

print_messages

