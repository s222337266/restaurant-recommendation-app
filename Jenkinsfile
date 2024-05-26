pipeline {
    agent any

    environment {
        // Define any environment variables here
        NODE_ENV = 'production'
        DOCKER_IMAGE = 'restaurant-recommendation-app' // Name of the Docker image
    }

    stages {
        stage('Build') {
            steps {
                script {
                    // Build Docker image
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    // Run tests
                    // If you have tests, this is where you would run them
                    // For example: `sh 'npm test'`
                    echo 'Running tests...'
                }
            }
        }
        stage('Code Quality Analysis') {
            steps {
                script {
                    // Code quality analysis
                    // This could be running a linter or using a tool like SonarQube
                    // For example: `sh 'npm run lint'`
                    echo 'Running code quality analysis...'
                }
            }
        }
        stage('Deploy to Test Environment') {
            steps {
                script {
                    // Deploy to a test environment
                    // For simplicity, we’ll just start the Docker container here
                    // In a real scenario, you might deploy to a staging server or container
                    echo 'Deploying to test environment...'
                    sh 'docker run -d -p 3000:3000 --name test-$DOCKER_IMAGE $DOCKER_IMAGE'
                }
            }
        }
        stage('Release to Production') {
            steps {
                script {
                    // Release to production
                    // This could involve more complex deployment steps
                    echo 'Releasing to production...'
                    // Example: `sh 'deploy_to_production_script.sh'`
                }
            }
        }
    }

    post {
        always {
            // Clean up steps, notifications, etc.
            echo 'Pipeline finished.'
        }
    }
}
