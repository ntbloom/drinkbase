# packages to install
vim
tmux
git
python3-pip
python3-venv
postgresql-client
postgresql-doc
postgresql-server
postgresql
node (probably later version than available)
apache -- find out which packages
curl

# things to do
- make ssh keys
- configure ssh/ssh_config
- copy ssh to github
- git clone configs and use bashrc/etc

# configure postgres
- login as postgres
- mkdir /usr/local/postgres, give ownership to postgres
- initdb (located /usr/lib/postgresql...)
- start database server
- create role
  CREATE ROLE debian LOGIN CREATEDB;
  ALTER ROLE debian SET client_min_messages = WARNING;

