FROM openjdk:17-jdk-slim

WORKDIR /app

# Используем volume для хранения Gradle-кэша (избегаем загрузки при каждом билде)
ENV GRADLE_USER_HOME /home/gradle/.gradle

# Копируем только файлы, необходимые для кеширования зависимостей Gradle
COPY gradlew gradlew
COPY gradle gradle
COPY build.gradle build.gradle
COPY settings.gradle settings.gradle

# Даем права на выполнение Gradle Wrapper
RUN chmod +x gradlew

# Запускаем скачивание зависимостей и кешируем их
RUN ./gradlew build --no-daemon --refresh-dependencies || true

# Копируем оставшуюся часть кода
COPY . .

# Запускаем сборку и дожидаемся генерации JAR-файла
RUN ./gradlew clean bootJar -x test

# Проверяем имя JAR-файла и копируем его явно
RUN JAR_FILE=$(find build/libs -type f -name "*.jar" | head -n 1) && cp "$JAR_FILE" /app/app.jar

# Открываем порт
EXPOSE 8080

# Запускаем JAR-файл
ENTRYPOINT ["java", "-jar", "app.jar"]