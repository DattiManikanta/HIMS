# ==============================================================================
# INDUS HEALTH CITY (HIMS) - MULTI-TIER PRODUCTION DOCKERFILE FOR RENDER
# Builds Spring Boot (Java 17 / 8) Backend + React / Node Frontend
# ==============================================================================

# Stage 1: Build Java Backend & Frontend Assets
FROM eclipse-temurin:17-jdk-jammy AS builder

# Install Maven and Node.js 20
RUN apt-get update && apt-get install -y curl maven \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy dependency definition files
COPY backend-spring/pom.xml ./backend-spring/
COPY package.json ./

# Cache Maven dependencies
RUN cd backend-spring && mvn dependency:go-offline -B || true

# Copy all source files
COPY . .

# Build Spring Boot JAR
RUN cd backend-spring && mvn clean package -DskipTests -B

# Compile Frontend Bundle (React components -> dist/bundle.js)
RUN node tools/build.cjs

# Stage 2: Minimal Runtime Image
FROM eclipse-temurin:17-jre-jammy

# Install Node.js 20 runtime
RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy application and built artifacts from builder
COPY --from=builder /app /app

# Memory limits optimized for Render Free Tier (512MB RAM)
ENV JAVA_TOOL_OPTIONS="-Xmx256m -Xms64m -XX:+UseSerialGC"
ENV PORT=3000
ENV BACKEND_PORT=5000

EXPOSE 3000

# Start server.cjs (serves frontend, reverse-proxies /api and /patient, and launches Spring Boot)
CMD ["node", "server.cjs"]
