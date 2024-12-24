pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('Docker-ID') // Replace with your actual credentials ID
        DOCKER_IMAGE = "marwaguerfel/tekupstudents"
        DOCKER_TAG = "latest"
    }
    
    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout scm
                    echo 'Repository Cloned'
                }
            }
        }
        
        stage('Setup Node.js') {
            steps {
                script {
                    sh '''
                        # Install Node.js 18 (recommended version for modern Angular projects)
                        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
                        sudo apt-get install -y nodejs
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
                        # Install dependencies with legacy peer dependency resolution
                        npm install --legacy-peer-deps
                        # Add Angular CLI to PATH for local installation
                        export PATH="$PATH:$(pwd)/node_modules/.bin"
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
                        # Build Angular application
                        ng build --configuration production
                    '''
                    echo 'Angular app built'
                }
            }
        }
        
        stage('Docker Build') {
            steps {
                script {
                    sh """
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

