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
		lsb-release \
		unattended-upgrades
}

# install docker, make drinkabse user part of group
get_docker()
{
	if [ ! -x /usr/bin/docker ]; then
		url=https://download.docker.com/linux/debian/gpg
		curl -fsSL $url | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
		echo \
		  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
		    $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
		apt-get update
		apt-get install -y docker-ce docker-ce-cli containerd.io
		usermod -aG docker drinkbase
		echo "docker installed at $(which docker)"
	else
		echo "docker already installed at $(which docker), skipping..."
	fi

}

# install and configure docker-compose
get_docker_compose()
{

	if [ ! -x /usr/local/bin/docker-compose ]; then
		url=https://github.com/docker/compose/releases/download/1.29.2/docker-compose-Linux-x86_64
		curl -L $url -o /usr/local/bin/docker-compose
		chmod +x /usr/local/bin/docker-compose
		ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose
		echo "docker-compose installed at $(which docker-compose)"
	else
		echo "docker-compose already installed at $(which docker-compose), skipping..."
	fi

}

# secure the server
configure_firewall()
{
	yes | ufw reset
	ufw enable
	ufw default deny incoming
	ufw default allow outgoing
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
get_docker
get_docker_compose
configure_firewall
print_messages

