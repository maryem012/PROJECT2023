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
        
        stage('Frontend Build') {
            steps {
                script {
                    try {
                        // Build frontend Docker image
                        sh """
                            docker build -t ${FRONTEND_IMAGE}:${DOCKER_TAG} \
                                --build-arg NODE_VERSION=18 \
                                --build-arg BUILD_CONFIGURATION=production \
                                -f Dockerfile.frontend .
                            
                            docker tag ${FRONTEND_IMAGE}:${DOCKER_TAG} ${FRONTEND_IMAGE}:latest
                        """
                    } catch (Exception e) {
                        echo "Frontend build failed: ${e.getMessage()}"
                        error "Frontend build failed"
                    }
                }
            }
        }
        
        stage('Backend Build') {
            steps {
                dir('backend') {
                    script {
                        try {
                            // Build backend Docker image
                            sh """
                                docker build -t ${BACKEND_IMAGE}:${DOCKER_TAG} \
                                    --build-arg NODE_VERSION=18 \
                                    -f Dockerfile.backend .
                                
                                docker tag ${BACKEND_IMAGE}:${DOCKER_TAG} ${BACKEND_IMAGE}:latest
                            """
                        } catch (Exception e) {
                            echo "Backend build failed: ${e.getMessage()}"
                            error "Backend build failed"
                        }
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
                            
                            # Push Frontend Images
                            docker push ${FRONTEND_IMAGE}:${DOCKER_TAG}
                            docker push ${FRONTEND_IMAGE}:latest
                            
                            # Push Backend Images
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
                        rm -rf node_modules dist
                        cd backend && rm -rf node_modules dist || true
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
