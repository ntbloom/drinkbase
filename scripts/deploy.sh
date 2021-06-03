# deploy.sh
# run the actual server

DOCKERDIR=/home/drinkbase/drinkbase/docker
YAML=$DOCKERDIR/docker-compose.yaml
ENV=$DOCKERDIR/env

# build the environment
with_build()
{
	docker-compose -f $YAML build \
		--parallel \
		--no-cache

}


# launch the docker-compose environment
up()
{
	docker-compose -f $YAML up

}

if [ $1 == build ]; then
	with_build
else
	echo "skipping build"
fi

up
