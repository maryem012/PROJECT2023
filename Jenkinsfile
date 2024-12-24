pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker-hub')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo 'Repository Cloned'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm install'
                echo 'Building the application'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
                echo 'Running tests'
            }
        }
        
        stage('Docker Build') {
            steps {
                sh 'docker build -t your-image-name .'
                echo 'Docker image built'
            }
        }
        
        stage('Docker Push') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh 'docker push your-image-name'
                echo 'Docker image pushed'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying to server'
                // Add deployment commands here
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline execution failed!'
        }
    }
}
