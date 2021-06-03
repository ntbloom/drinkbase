# deploy.sh
# run the actual server

DOCKERDIR=/home/drinkbase/drinkbase/docker
YAML=$DOCKERDIR/docker-compose.yaml
ENV=$DOCKERDIR/env

# build the environment
build()
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

down() 
{

	docker-compose -f $YAML down
}

#build
#up
#down
