pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('Docker-ID')
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
                        curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
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
                        npm install
                        # Using locally installed Angular CLI
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
                sh 'sudo docker logout || true'
            }
        }
    }
}
