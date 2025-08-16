document.addEventListener('DOMContentLoaded', function() {
            const femaleBtn = document.getElementById('femaleBtn');
            const maleBtn = document.getElementById('maleBtn');
            const calculateBtn = document.getElementById('calculateBtn');
            const heightInput = document.getElementById('height');
            const weightInput = document.getElementById('weight');
            const bodyShape = document.getElementById('bodyShape');
            const bodyTypeText = document.getElementById('bodyTypeText');
            const resultBox = document.getElementById('resultBox');
            const bmiValue = document.getElementById('bmiValue');
            const bmiCategory = document.getElementById('bmiCategory');
            const bodyTypeResult = document.getElementById('bodyTypeResult');
            const bodyTypeDesc = document.getElementById('bodyTypeDesc');
            const healthRisk = document.getElementById('healthRisk');
            const healthAdvice = document.getElementById('healthAdvice');
            const bodyTypeDetails = document.getElementById('bodyTypeDetails');
            const extraMeasurements = document.getElementById('extraMeasurements');
            const analyzeBtn = document.getElementById('analyzeBtn');
            const chestInput = document.getElementById('chest');
            const waistMInput = document.getElementById('waistM');
            const hipInput = document.getElementById('hip');
            
            let selectedGender = 'female';
            
            // Gender selection
            femaleBtn.addEventListener('click', function() {
                selectedGender = 'female';
                femaleBtn.classList.add('bg-pink-200', 'border-pink-500');
                maleBtn.classList.remove('bg-blue-200', 'border-blue-500');
                bodyShape.className = 'female-body w-full h-full';
                bodyTypeText.textContent = 'Female body visualization';
            });
            
            maleBtn.addEventListener('click', function() {
                selectedGender = 'male';
                maleBtn.classList.add('bg-blue-200', 'border-blue-500');
                femaleBtn.classList.remove('bg-pink-200', 'border-pink-500');
                bodyShape.className = 'male-body w-full h-full';
                bodyTypeText.textContent = 'Male body visualization';
            });
            
            // Default to female
            femaleBtn.click();
            
            // Calculate BMI
            calculateBtn.addEventListener('click', function() {
                const height = parseFloat(heightInput.value);
                const weight = parseFloat(weightInput.value);
                
                if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
                    alert('Please enter valid height and weight values');
                    return;
                }
                
                // Calculate BMI
                const heightInMeters = height / 100;
                const bmi = weight / (heightInMeters * heightInMeters);
                const roundedBMI = bmi.toFixed(1);
                
                // Determine BMI category
                let category, risk, advice, categoryClass;
                if (bmi < 18.5) {
                    category = 'Underweight';
                    risk = 'Increased risk';
                    advice = 'Consider gaining weight through a balanced diet';
                    categoryClass = 'bg-yellow-500';
                } else if (bmi >= 18.5 && bmi < 25) {
                    category = 'Normal weight';
                    risk = 'Low risk';
                    advice = 'Maintain your healthy lifestyle';
                    categoryClass = 'bg-green-500';
                } else if (bmi >= 25 && bmi < 30) {
                    category = 'Overweight';
                    risk = 'Moderate risk';
                    advice = 'Consider losing weight through diet and exercise';
                    categoryClass = 'bg-orange-500';
                } else {
                    category = 'Obese';
                    risk = 'High risk';
                    advice = 'Consult a healthcare provider for weight management';
                    categoryClass = 'bg-red-500';
                }
                
                // Determine body type based on BMI and gender
                let bodyType, bodyDesc, bodyDetails;
                let bodyShapeClass = '';
                
                if (bmi < 18.5) {
                    bodyType = 'Rectangle Shape';
                    bodyDesc = 'Straight up and down with little waist definition';
                    bodyDetails = `
                        <ul class="list-disc pl-5 space-y-1">
                            <li>Shoulders, waist, and hips are similar in width</li>
                            <li>Little waist definition</li>
                            <li>Tends to be tall and slender</li>
                            <li>May have difficulty gaining weight</li>
                        </ul>
                    `;
                    bodyShapeClass = 'rectangle-shape';
                } else if (bmi >= 18.5 && bmi < 22) {
                    bodyType = selectedGender === 'female' ? 'Pear Shape' : 'Triangle Shape';
                    bodyDesc = selectedGender === 'female' ? 'Wider hips than bust with a defined waist' : 'Broader shoulders than hips';
                    bodyDetails = selectedGender === 'female' ? `
                        <ul class="list-disc pl-5 space-y-1">
                            <li>Hips wider than bust</li>
                            <li>Clearly defined waist</li>
                            <li>Weight tends to deposit in hips and thighs</li>
                            <li>Common body type for women</li>
                        </ul>
                    ` : `
                        <ul class="list-disc pl-5 space-y-1">
                            <li>Shoulders wider than hips</li>
                            <li>V-shaped torso</li>
                            <li>Narrow waist and hips</li>
                            <li>Common body type for men</li>
                        </ul>
                    `;
                    bodyShapeClass = selectedGender === 'female' ? 'pear-shape' : 'inverted-triangle';
                } else if (bmi >= 22 && bmi < 25) {
                    bodyType = 'Hourglass Shape';
                    bodyDesc = 'Balanced bust and hips with a narrow waist';
                    bodyDetails = `
                        <ul class="list-disc pl-5 space-y-1">
                            <li>Bust and hips are similar in width</li>
                            <li>Clearly defined waist</li>
                            <li>Proportionate upper and lower body</li>
                            <li>Considered the classic feminine shape</li>
                        </ul>
                    `;
                    bodyShapeClass = 'hourglass-shape';
                } else {
                    bodyType = 'Apple Shape';
                    bodyDesc = 'Broader waist and bust with narrower hips';
                    bodyDetails = `
                        <ul class="list-disc pl-5 space-y-1">
                            <li>Weight tends to accumulate around the midsection</li>
                            <li>Broader shoulders and bust than hips</li>
                            <li>Less defined waist</li>
                            <li>Higher risk for certain health conditions</li>
                        </ul>
                    `;
                    bodyShapeClass = 'apple-shape';
                }
                
                // Update UI with results
                bmiValue.textContent = `BMI: ${roundedBMI}`;
                bmiCategory.textContent = category;
                bmiCategory.className = `px-4 py-2 rounded-full text-white font-medium ${categoryClass} pulse`;
                bodyTypeResult.textContent = bodyType;
                bodyTypeDesc.textContent = bodyDesc;
                healthRisk.textContent = risk;
                healthAdvice.textContent = advice;
                bodyTypeDetails.innerHTML = bodyDetails;
                
                // Update body visualization
                bodyShape.className = `${selectedGender === 'female' ? 'female-body' : 'male-body'} ${bodyShapeClass} w-full h-full`;
                bodyTypeText.textContent = `${bodyType} visualization`;
                
                // Show results
                resultBox.classList.add('open');
                
                // Show extra measurements after BMI calculation
                extraMeasurements.classList.remove('hidden');
                
                // Scroll to results
                resultBox.scrollIntoView({ behavior: 'smooth' });
            });
            
            // Analyze body type based on measurements
            analyzeBtn.addEventListener('click', function() {
                const chest = parseFloat(chestInput.value);
                const waist = parseFloat(waistMInput.value);
                const hip = parseFloat(hipInput.value);

                if (isNaN(chest) || isNaN(waist) || isNaN(hip) || chest <= 0 || waist <= 0 || hip <= 0) {
                    alert('Please enter valid chest, waist, and hip measurements');
                    return;
                }

                let bodyType = '';
                let bodyDesc = '';
                let bodyDetails = '';
                let bodyShapeClass = '';

                // Simple logic for body type based on ratios
                const waistToHip = waist / hip;
                const chestToWaist = chest / waist;

                if (selectedGender === 'female') {
                    if (waistToHip < 0.8 && chestToWaist > 0.95) {
                        bodyType = 'Hourglass';
                        bodyDesc = 'Balanced bust and hips with a narrow waist';
                        bodyShapeClass = 'hourglass-shape';
                        bodyDetails = `
                            <ul class="list-disc pl-5 space-y-1">
                                <li>Bust and hips are similar in width</li>
                                <li>Clearly defined waist</li>
                                <li>Proportionate upper and lower body</li>
                            </ul>
                        `;
                    } else if (waistToHip >= 0.8 && hip > chest) {
                        bodyType = 'Pear';
                        bodyDesc = 'Wider hips than bust with a defined waist';
                        bodyShapeClass = 'pear-shape';
                        bodyDetails = `
                            <ul class="list-disc pl-5 space-y-1">
                                <li>Hips wider than bust</li>
                                <li>Clearly defined waist</li>
                                <li>Weight tends to deposit in hips and thighs</li>
                            </ul>
                        `;
                    } else if (waistToHip > 0.85 && chest > hip) {
                        bodyType = 'Apple';
                        bodyDesc = 'Broader waist and bust with narrower hips';
                        bodyShapeClass = 'apple-shape';
                        bodyDetails = `
                            <ul class="list-disc pl-5 space-y-1">
                                <li>Weight tends to accumulate around the midsection</li>
                                <li>Broader shoulders and bust than hips</li>
                                <li>Less defined waist</li>
                            </ul>
                        `;
                    } else {
                        bodyType = 'Rectangle';
                        bodyDesc = 'Straight up and down with little waist definition';
                        bodyShapeClass = 'rectangle-shape';
                        bodyDetails = `
                            <ul class="list-disc pl-5 space-y-1">
                                <li>Shoulders, waist, and hips are similar in width</li>
                                <li>Little waist definition</li>
                            </ul>
                        `;
                    }
                } else {
                    // Male logic
                    if (chest > hip && chest > waist) {
                        bodyType = 'Inverted Triangle';
                        bodyDesc = 'Broad chest and shoulders, narrow waist and hips';
                        bodyShapeClass = 'inverted-triangle';
                        bodyDetails = `
                            <ul class="list-disc pl-5 space-y-1">
                                <li>Shoulders and chest wider than hips</li>
                                <li>Narrow waist and hips</li>
                            </ul>
                        `;
                    } else if (waist > chest && waist > hip) {
                        bodyType = 'Apple';
                        bodyDesc = 'Broader waist with narrower chest and hips';
                        bodyShapeClass = 'apple-shape';
                        bodyDetails = `
                            <ul class="list-disc pl-5 space-y-1">
                                <li>Weight tends to accumulate around the midsection</li>
                                <li>Less defined chest and hips</li>
                            </ul>
                        `;
                    } else if (hip > chest && hip > waist) {
                        bodyType = 'Pear';
                        bodyDesc = 'Wider hips than chest and waist';
                        bodyShapeClass = 'pear-shape';
                        bodyDetails = `
                            <ul class="list-disc pl-5 space-y-1">
                                <li>Hips wider than chest</li>
                                <li>Clearly defined waist</li>
                            </ul>
                        `;
                    } else {
                        bodyType = 'Rectangle';
                        bodyDesc = 'Straight up and down with little waist definition';
                        bodyShapeClass = 'rectangle-shape';
                        bodyDetails = `
                            <ul class="list-disc pl-5 space-y-1">
                                <li>Shoulders, waist, and hips are similar in width</li>
                                <li>Little waist definition</li>
                            </ul>
                        `;
                    }
                }

                // Update UI with new body type
                bodyTypeResult.textContent = bodyType + ' Shape';
                bodyTypeDesc.textContent = bodyDesc;
                bodyTypeDetails.innerHTML = bodyDetails;
                bodyShape.className = `${selectedGender === 'female' ? 'female-body' : 'male-body'} ${bodyShapeClass} w-full h-full`;
                bodyTypeText.textContent = `${bodyType} visualization (based on measurements)`;

                // Scroll to results
                resultBox.scrollIntoView({ behavior: 'smooth' });
            });
        });