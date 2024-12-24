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
        
        stage('Install Dependencies') {
            steps {
                script {
                    sh '''
                        npm install -g @angular/cli@16.1.0
                        npm install
                    '''
                    echo 'Dependencies installed'
                }
            }
        }
        
        stage('Build') {
            steps {
                script {
                    sh 'ng build --configuration production'
                    echo 'Angular app built'
                }
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
        
        stage('Docker Login and Push') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh """
                            echo '$DOCKER_PASSWORD' | docker login -u '$DOCKER_USERNAME' --password-stdin
                            docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
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
                sh 'docker logout'
            }
        }
    }
}
