# deploy.sh
# run the actual server

DOCKERDIR=/home/drinkbase/drinkbase/docker
YAML=$DOCKERDIR/docker-compose.yaml
ENV=$DOCKERDIR/env


down() 
{

	docker-compose -f $YAML down
}

down
