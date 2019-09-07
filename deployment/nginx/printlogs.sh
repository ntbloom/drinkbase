DEST_DIR="/var/log/nginx/"

echo "recent IP addresses and timestamps"
grep -h chunk $DEST_DIR/* | sort | cut -c 1-36 | sed 's/$/]/' | uniq

echo "\nUnique IPs in regular logs"
grep -s chunk $DEST_DIR/* | sed -e 's/\([0-9]\+\.[0-9]\+\.[0-9]\+\.[0-9]\+\).*$/\1/' | sort | uniq | wc -l

echo "\nUnique IPs in zipped files"
gunzip -cq $DEST_DIR/*.gz | grep -s chunk | sed -e 's/\([0-9]\+\.[0-9]\+\.[0-9]\+\.[0-9]\+\).*$/\1/' | sort | uniq | wc -l

echo "\nRecords date back to"
date -r $DEST_DIR/access.log.14.gz
