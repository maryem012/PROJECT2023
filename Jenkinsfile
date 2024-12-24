pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        DOCKER_IMAGE = "marwaguerfel/tekupstudents"
        DOCKER_TAG = "latest"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo 'Repository Cloned'
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
                sh """
                    docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                    echo 'Docker image built'
                """
            }
        }
        
        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
                    sh '''
                        echo $DOCKERHUB_PASSWORD | docker login -u $DOCKERHUB_USERNAME --password-stdin
                        echo 'Login Completed'
                    '''
                }
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
