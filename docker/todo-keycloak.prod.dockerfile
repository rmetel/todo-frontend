FROM quay.io/keycloak/keycloak:latest as builder

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

# Configure a database vendor
ENV KC_DB=postgres

WORKDIR /opt/keycloak
# for demonstration purposes only, please make sure to use proper certificates in production instead
RUN keytool -genkeypair -storepass password -storetype PKCS12 -keyalg RSA -keysize 2048 -dname "CN=server" -alias server -ext "SAN:c=DNS:todo-app.tech,IP:212.227.201.99" -keystore conf/server.keystore
RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:latest
COPY --from=builder /opt/keycloak/ /opt/keycloak/

# change these values to point to a running postgres instance
ENV KC_DB=postgres
ENV KC_DB_URL=jdbc:postgresql://todo-postgres:5432/keycloak
ENV KC_DB_USERNAME=root
ENV KC_DB_PASSWORD=todo
ENV KC_HOSTNAME=localhost
ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]

# terminal
# docker build -t todo-keycloak -f docker/todo-keycloak.prod.dockerfile .

# docker hub
# docker build -t ddrram/todo-keycloak-prod:1.0.0 -f docker/todo-keycloak.prod.dockerfile .
# docker push ddrram/todo-keycloak-prod:1.0.0
# docker run --name todo-keycloak-prod -dp 8080:8080 ddrram/todo-keycloak-prod:1.0.0