pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('Docker-ID') // Replace with your Docker credentials ID
        DOCKER_IMAGE = "marwaguerfel/tekupstudents"
        DOCKER_TAG = "latest"
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Clone the repository
                    checkout scm
                    echo 'Repository Cloned'
                }
            }
        }

        stage('Setup Node.js') {
            steps {
                script {
                    sh '''
                        # Install Node.js (recommended version)
                        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
                        sudo apt-get install -y nodejs
                        # Display Node.js and npm versions
                        node --version
                        npm --version
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh '''
                        # Install project dependencies and resolve peer conflicts
                        npm install --legacy-peer-deps
                        # Attempt to fix any known vulnerabilities
                        npm audit fix || true
                        # Add Angular CLI to PATH
                        export PATH="$PATH:$(pwd)/node_modules/.bin"
                        # Display Angular CLI version
                        ng version
                    '''
                    echo 'Dependencies installed'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh '''
                        export PATH="$PATH:$(pwd)/node_modules/.bin"
                        # Build the Angular application with production configuration
                        ng build --configuration production --no-budget
                    '''
                    echo 'Angular app built'
                }
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    sh """
                        # Build the Docker image for the Angular app
                        sudo docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                        echo 'Docker image built'
                    """
                }
            }
        }

        stage('Docker Login and Push') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'Docker-ID', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh """
                            # Log in to Docker Hub and push the image
                            echo '$DOCKER_PASSWORD' | sudo docker login -u '$DOCKER_USERNAME' --password-stdin
                            sudo docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                echo 'Pipeline succeeded! Docker image pushed to registry'
            }
        }
        failure {
            script {
                echo 'Pipeline failed!'
            }
        }
        always {
            script {
                // Ensure Docker logout happens regardless of pipeline success or failure
                sh 'sudo docker logout || true'
            }
        }
    }
}

