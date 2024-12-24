pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        DOCKER_IMAGE = "marwaguerfel/tekupstudents"
        DOCKER_TAG = "latest"
        NODE_VERSION = '16'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo 'Repository Cloned'
            }
        }
        
        stage('Setup Node.js') {
            steps {
                sh '''
                    curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
                    sudo apt-get install -y nodejs
                    node --version
                    npm --version
                '''
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh '''
                    npm install -g @angular/cli@16.1.0
                    npm install
                '''
                echo 'Dependencies installed'
            }
        }
        
        stage('Build') {
            steps {
                sh 'ng build --configuration production'
                echo 'Angular app built'
            }
        }
        
        stage('Docker Build') {
            steps {
                script {
                    sh """
                        docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                        echo 'Docker image built'
                    """
                }
            }
        }
        
        stage('Docker Login') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                echo 'Login Completed'
            }
        }
        
        stage('Docker Push') {
            steps {
                sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                echo 'Push Completed'
            }
        }
    }
    
    post {
        always {
            sh 'docker logout'
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline execution failed!'
        }
    }
}
