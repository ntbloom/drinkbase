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
	docker-compose up -f $YAML nodejs

}


# launch the docker-compose environment, except for building the front-end
up()
{
	docker-compose -f $YAML up \
		api \
		db \
		frontend

}

down() 
{

	docker-compose -f $YAML down
}

#build
#up
#down
