#!/bin/bash

cd db
docker compose down
docker compose up -d
docker exec -it blog_app_postgres psql -U blog_user -d blog_db -p 5432