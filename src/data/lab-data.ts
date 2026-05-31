import { Subject, Testimonial, Feature, Step } from "@/types/ui-types"

export const LAB_SUBJECTS: Subject[] = [
  {
    id: 'python',
    name: 'Python',
    iconName: 'Binary',
    description: 'Data ingestion, analysis, scraping, NumPy manipulation, Pandas dataframes, and Matplotlib plotting.',
    themeColor: '#FFFFFF', // Monochrome White
    practicalCount: 12,
    practicals: [
      {
        id: 'py-p1',
        number: 1,
        title: 'Pandas Data Aggregation & Analysis',
        aim: 'Fetch API endpoints or parse raw CSV data, perform group-by analysis, filtering, and persist filtered frames as JSON files.',
        language: 'python',
        code: `import pandas as pd
import json

# Loading student score dataset
data = {
    'StudentName': ['Aman', 'Sanya', 'Raj', 'Divya', 'Vikram'],
    'Subject': ['Maths', 'CS', 'Maths', 'CS', 'CS'],
    'Score': [85, 92, 78, 95, 88],
    'Attendance': [90, 95, 80, 98, 85]
}

df = pd.DataFrame(data)

# Perform aggregation to find mean score by subject
grouped_df = df.groupby('Subject').agg({
    'Score': 'mean',
    'Attendance': 'mean'
}).reset_index()

# Save output analysis
result_json = grouped_df.to_json(orient='records')
print(json.dumps(json.loads(result_json), indent=4))
# Output: Mean scores and attendance categorized by Subject.`,
        explanation: 'Utilizes Pandas fast NumPy-vectorized vector blocks to process multi-indexed groupings with minimal CPU operations.'
      },
      {
        id: 'py-p2',
        number: 2,
        title: 'NumPy Array Manipulation & Vector Operations',
        aim: 'Compare execution performance between traditional Python loops and vectorized NumPy array operations for matrix aggregation.',
        language: 'python',
        code: `import numpy as np
import time

# Create structured test elements
size = 1000000
python_list = list(range(size))
numpy_arr = np.arange(size)

# Time python native map loop
start_t = time.time()
python_list_result = [x + 2 for x in python_list]
native_duration = time.time() - start_t

# Time highly optimized numpy vector addition 
start_t = time.time()
numpy_arr_result = numpy_arr + 2
vect_duration = time.time() - start_t

print(f"Native loop time: {native_duration:.4f}s")
print(f"NumPy vectorized time: {vect_duration:.4f}s")
print(f"Speedup multiplier: {native_duration / vect_duration:.1f}x")`,
        explanation: 'Leverages compiled dynamic C-level array loops to compute arithmetic translations in contiguous RAM memory sectors.'
      }
    ]
  },
  {
    id: 'dbms',
    name: 'Database Management (DBMS)',
    iconName: 'Database',
    description: 'Relational algebra, complex SQL queries, Joins, subqueries, PL/SQL triggers, procedures, and ER design.',
    themeColor: '#FFFFFF', // Monochrome White
    practicalCount: 16,
    practicals: [
      {
        id: 'db-p1',
        number: 1,
        title: 'Complex Departmental Multi-Joins',
        aim: 'Perform nested SQL query joins using Department, Employee and Project tables to extract high-pay multi-project leaders.',
        language: 'sql',
        code: `SELECT 
    e.emp_id,
    e.first_name || ' ' || e.last_name AS employee_name,
    d.dept_name,
    COUNT(ep.project_id) AS delegated_projects,
    SUM(p.budget) AS total_assigned_budget
FROM Employee e
INNER JOIN Department d ON e.dept_id = d.dept_id
LEFT JOIN Employee_Project ep ON e.emp_id = ep.emp_id
LEFT JOIN Project p ON ep.project_id = p.project_id
GROUP BY e.emp_id, e.first_name, e.last_name, d.dept_name
HAVING COUNT(ep.project_id) >= 2
ORDER BY total_assigned_budget DESC;`,
        explanation: 'Leverages hash joins and index structures of foreign key bounds to achieve high-performance relational joining.'
      },
      {
        id: 'db-p2',
        number: 2,
        title: 'PL/SQL Row Level Audit Trigger',
        aim: 'Formulate an automated database security auditor tracking internal updates of salary tables.',
        language: 'sql',
        code: `CREATE OR REPLACE TRIGGER Salary_Audit_Tracker
BEFORE UPDATE OF salary ON Employee
FOR EACH ROW
BEGIN
    INSERT INTO Employee_Audit_Logs (
        emp_id, 
        old_salary, 
        new_salary, 
        modified_by, 
        modified_at
    ) VALUES (
        :OLD.emp_id, 
        :OLD.salary, 
        :NEW.salary, 
        USER, 
        SYSDATE
    );
END;
/`,
        explanation: 'Automates relational integrity logs without requiring API middleware trigger interventions.'
      }
    ]
  },
  {
    id: 'project-1',
    name: 'Project - 1 (HTML, CSS, JS, PHP)',
    iconName: 'Globe',
    description: 'Front-end layout construction, native form validation, asynchronous state handling, and PHP backend controller scripts.',
    themeColor: '#FFFFFF', // Monochrome White
    practicalCount: 10,
    practicals: [
      {
        id: 'proj-p1',
        number: 1,
        title: 'Responsive Registration Form with JS Validation',
        aim: 'Craft a semantic HTML5 form structure backed by CSS layout rules, integrated with Client-side event filters checking password matches.',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Registration Interface</title>
    <style>
        body { font-family: monospace; background: #000; color: #fff; padding: 20px; }
        .form-card { max-width: 400px; padding: 25px; border: 1px solid #333; }
        .input-group { margin-bottom: 15px; }
        .input-group label { display: block; margin-bottom: 5px; font-size: 11px; }
        .input-group input { width: 100%; padding: 8px; background: #111; border: 1px solid #444; color: #fff; }
        .error-lbl { color: #f43f5e; font-size: 11px; margin-top: 5px; display: none; }
    </style>
</head>
<body>
    <div class="form-card">
        <h3>ACADEMIC PORTAL</h3>
        <form id="regForm" onsubmit="return validateSec(event)">
            <div class="input-group">
                <label>STUDENT EMAIL</label>
                <input type="email" id="email" required>
            </div>
            <div class="input-group">
                <label>PASSWORD</label>
                <input type="password" id="pass1" required>
            </div>
            <div class="input-group">
                <label>CONFIRM PASSWORD</label>
                <input type="password" id="pass2" required>
                <div id="errBlock" class="error-lbl">Passwords do not align!</div>
            </div>
            <button type="submit" style="background:#fff; color:#000; font-weight:bold; border:none; padding:10px 20px; width:100%;">SUBMIT REGISTRY</button>
        </form>
    </div>

    <script>
        function validateSec(e) {
            const p1 = document.getElementById('pass1').value;
            const p2 = document.getElementById('pass2').value;
            const err = document.getElementById('errBlock');
            if (p1 !== p2) {
                e.preventDefault();
                err.style.display = 'block';
                return false;
            }
            err.style.display = 'none';
            alert('Validation successful !');
            return true;
        }
    </script>
</body>
</html>`,
        explanation: 'Combines simple HTML5 structure with vanilla Javascript event interceptors preventing bad database actions.'
      },
      {
        id: 'proj-p2',
        number: 2,
        title: 'PHP Secure Database Connection and Fetching',
        aim: 'Build a secure dynamic backend PHP script deploying raw SQL statements through PDO mechanisms to return records securely.',
        language: 'php',
        code: `<?php
header('Content-Type: application/json');

$host = 'localhost';
$db   = 'all_labs_registry';
$user = 'student';
$pass = 'secure_password';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
     $pdo = new PDO($dsn, $user, $pass, $options);
     
     // Retrieve database payload
     $statement = $pdo->query('SELECT practical_id, title, author FROM practical_registry');
     $output = $statement->fetchAll();
     
     echo json_encode([
         "status" => "success",
         "meta" => ["count" => count($output)],
         "data" => $output
     ]);
} catch (PDOException $e) {
     echo json_encode([
         "status" => "error",
         "message" => "Database connection failure: " . $e->getMessage()
     ]);
}
?>`,
        explanation: 'Employs PDO (PHP Data Objects) secure parameterization bounds protecting relational tables from injection scripts.'
      }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Aarav Mehta',
    role: 'MCA Student, Year 2',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
    comment: 'All Labs completely turned around my lab schedules. Instead of tracing down seniors or copy-pasting bad photos of journals, I open All Labs, review clean algorithms and explain codes instantly.',
    college: 'Pune University (SPPU)',
    rating: 5
  },
  {
    id: 't2',
    name: 'Sanya Sharma',
    role: 'CS Undergrad',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    comment: 'I no longer need to search seniors for practical files. Everything is structured beautifully in this single-hub directory.',
    college: 'DTU, Delhi',
    rating: 5
  },
  {
    id: 't3',
    name: 'Vikram Choudhary',
    role: 'MCA graduate',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    comment: 'Finding reliable references was a structural nightmare. All Labs centralized practical scripts in a slick, elegant black-white theme.',
    college: 'VJTI, Mumbai',
    rating: 5
  }
];

export const SAAS_FEATURES: Feature[] = [
  {
    id: 'feat1',
    iconName: 'BookOpen',
    title: 'Lab Manuals',
    description: 'Centralized directory of verified curriculum lab manuals with strict objective outlines for every subject.',
    badge: 'Standardized'
  },
  {
    id: 'feat2',
    iconName: 'Terminal',
    title: 'Ready Programs',
    description: 'Clean coding scripts featuring detailed logic explanation blocks and complete parameter listings.',
    badge: 'Code Ready'
  },
  {
    id: 'feat3',
    iconName: 'HelpCircle',
    title: 'Instant Explanations',
    description: 'Deep line-by-line analyses of algorithm steps and variables to quickly master dynamic assignments.',
    badge: 'Code Logic'
  },
];

export const SAVINGS_STEPS: Step[] = [
  {
    number: 1,
    title: 'Choose Your Subject',
    description: 'Filter our extensive library by computer engineering or MCA subjects like Python, Database, or Web Projects.',
    badge: '01. Browse'
  },
  {
    number: 2,
    title: 'Open Desired Practical',
    description: 'Review clear objective guidelines, detailed implementation codes, and step-by-step logic workflows instantly.',
    badge: '02. Study'
  },
  {
    number: 3,
    title: 'Accelerate Your Work',
    description: 'Grasp the core logic blocks, draft your journal with pristine documentation templates, and save vital coding hours.',
    badge: '03. Perform'
  }
];
