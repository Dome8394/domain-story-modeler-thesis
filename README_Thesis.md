### JSON Structure

    runTimeQualityAnalysis: [
        monitoring: []
        loadtest: [],
        resilience: [
            {
                "artifact": "node1",
                "environment": [
                    {
                        "Environment": "PROD",
                        "Additional Information": [
                            {
                                "Execution during office hours": true,
                                "Execution after office hours": false
                            }
                        ],
                        "Instances": 1,
                        "Random Selection": true
                    }
                ],
                "Response Measure": [
                    {
                        "Response Time": 1000ms
                    }
                ],
                "Description": "Test description",
                "Stimulus": [
                    {
                        "Service Failure": true,
                        "Time to Failure": 22
                    }
                ]
            }
        ],
    ]
    