pipeline {
    agent any

    environment {
        // Define any environment variables here
        BUILD_DIR = 'build' // Directory where the build artifacts will be created
    }

    stages {
        stage('Build') {
            steps {
                script {
                    // Install dependencies
                    bat 'npm install'

                    // Run build script
                    bat 'npm run build'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    // Run tests
                    // If you have tests, this is where you would run them
                    // For example: `sh 'npm test'`
                    bat 'npm test'
                }
            }
        }
        stage('Code Quality Analysis') {
            tools {
                jdk "jdk17" // the name you have given the JDK installation using the JDK manager (Global Tool Configuration)
            }
            steps {
                script {
                    // Run SonarQube analysis
                    withSonarQubeEnv('SonarQube Server') {
                        bat "${SONARQUBE_SCANNER_HOME}/bin/sonar-scanner"
                    }
                }
            }
        }
        stage('Deploy to Test Environment') {
            steps {
                script {
                    // Deploy to a test environment
                    // For simplicity, we’ll just print the message
                    echo 'Deploying to test environment...'
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
