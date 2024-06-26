pipeline {
    agent any

    environment {
        // Define any environment variables here
        BUILD_DIR = 'build' // Directory where the build artifacts will be created
        SONAR_TOKEN = "sqa_15771b5e67dfbcf6d6cf73049e646e1c14f9c464"
        SONARQUBE_SCANNER_HOME = tool name: 'sq1-scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
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
        stage('SonarQube Analysis') {
            steps {
                script {
                    // Run SonarQube analysis
                    withSonarQubeEnv('sq1') { // 'sonar' should match the name you configured
                        bat "${SONARQUBE_SCANNER_HOME}\\bin\\sonar-scanner.bat -Dsonar.token=${SONAR_TOKEN}"
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
