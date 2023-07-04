# ============================================VARIABLES===========================================
docker_v2 = docker compose

compose_directory = docker/compose

web_container = -f $(compose_directory)/web.yml

capture_exit_code = --abort-on-container-exit --exit-code-from

compose_web = $(docker_v2) ${web_container} --env-file .env

# ============================================VARIABLES===========================================

# ======================================DOCKER(COMMON RULES)======================================
.PHONY: build
build:
	$(compose_web) build

.PHONY: stop
stop:
	$(compose_web) stop

.PHONY: down
down:
	$(compose_web) down

.PHONY: restart
restart:
	$(compose_web) stop
	$(compose_web) up -d

.PHONY: destroy
destroy:
	$(compose_web) down -v

.PHONY: exec
exec:
	$(compose_web) exec $(container) /bin/bash

.PHONY: application logs
logs:
	$(compose_web) logs -f
# ======================================DOCKER(COMMON RULES)======================================
