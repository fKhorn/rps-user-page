FROM openjdk:17-jdk-slim AS build

WORKDIR /app

# Кэшируем зависимости отдельно
COPY gradlew gradlew
COPY gradle gradle
COPY build.gradle build.gradle
COPY settings.gradle settings.gradle

RUN chmod +x gradlew
RUN ./gradlew --version

# Скачиваем зависимости
RUN ./gradlew dependencies --configuration runtimeClasspath

# Копируем исходники и собираем проект
COPY src src
COPY . .
RUN ./gradlew clean bootJar -x test

# Финальный образ
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]