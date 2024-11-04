# Programsko inženjerstvo projekt

## Pokretanje

### Pokretanje backenda

```
./mvnw spring-boot:run
```

Ili za windows

```
./mvnw.cmd spring-boot:run
```

### Pokretanje frontenda

```
cd frontend
npm start
```

### Build jar-a za deploy (ovo se automatski izvršava na serveru prilikom pusha na main)

```
./mvnw clean install -Prelease
java -jar target/project_bajeet*.jar
```