pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('Docker-ID')
        FRONTEND_IMAGE = "maryam2904/project2023-frontend"
        BACKEND_IMAGE = "maryam2904/project2023-backend"
        DOCKER_TAG = "${GIT_COMMIT_SHORT}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'mkdir -p backend'
                dir('backend') {
                    git url: 'https://github.com/maryem012/PROJECT2023.git', branch: 'backend'
                }
            }
        }

        stage('Create Dockerfile') {
            steps {
                script {
                    // Create frontend Dockerfile
                    writeFile file: 'Dockerfile', text: '''
                        FROM node:18 AS builder
                        WORKDIR /app
                        
                        # Copy package files
                        COPY package*.json ./
                        
                        # Install dependencies
                        RUN npm install --legacy-peer-deps
                        
                        # Copy source
                        COPY . .
                        
                        # Build application
                        RUN npm run build --configuration=production

                        # Production stage
                        FROM nginx:alpine
                        COPY nginx.conf /etc/nginx/conf.d/default.conf
                        COPY --from=builder /app/dist/tek-up-students /usr/share/nginx/html/
                        EXPOSE 80
                        CMD ["nginx", "-g", "daemon off;"]
                    '''
                }
                
                dir('backend') {
                    // Create backend Dockerfile
                    writeFile file: 'Dockerfile', text: '''
                        FROM node:18 AS builder
                        WORKDIR /app
                        COPY package*.json ./
                        RUN npm install
                        COPY . .
                        RUN npm run build

                        FROM node:18-alpine
                        WORKDIR /app
                        COPY package*.json ./
                        RUN npm install --only=production
                        COPY --from=builder /app/dist ./dist
                        EXPOSE 3000
                        CMD ["npm", "run", "start:prod"]
                    '''
                }
            }
        }
        
        stage('Docker Build') {
            steps {
                script {
                    try {
                        // Build frontend
                        sh """
                            docker build -t ${FRONTEND_IMAGE}:${DOCKER_TAG} .
                            docker tag ${FRONTEND_IMAGE}:${DOCKER_TAG} ${FRONTEND_IMAGE}:latest
                        """
                        
                        // Build backend
                        dir('backend') {
                            sh """
                                docker build -t ${BACKEND_IMAGE}:${DOCKER_TAG} .
                                docker tag ${BACKEND_IMAGE}:${DOCKER_TAG} ${BACKEND_IMAGE}:latest
                            """
                        }
                    } catch (Exception e) {
                        echo "Docker build failed: ${e.getMessage()}"
                        error "Docker build failed"
                    }
                }
            }
        }
        
        stage('Docker Push') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'Docker-ID', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh """
                            echo '$DOCKER_PASSWORD' | docker login -u '$DOCKER_USERNAME' --password-stdin
                            
                            docker push ${FRONTEND_IMAGE}:${DOCKER_TAG}
                            docker push ${FRONTEND_IMAGE}:latest
                            
                            docker push ${BACKEND_IMAGE}:${DOCKER_TAG}
                            docker push ${BACKEND_IMAGE}:latest
                        """
                    }
                }
            }
        }
        
        stage('Cleanup') {
            steps {
                script {
                    sh '''
                        docker logout || true
                        docker system prune -f
                    '''
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline succeeded! Docker images built and pushed successfully'
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
        always {
            cleanWs()
        }
    }
}
