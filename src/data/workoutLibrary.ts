export interface ExerciseDetail {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
  restTime: number;
  targetMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment: string[];
  image?: string;
}

export interface WorkoutCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  exercises: ExerciseDetail[];
}

export const workoutLibrary: WorkoutCategory[] = [
  {
    id: 'chest',
    name: 'Chest',
    icon: '💪',
    description: 'Build a powerful chest with these proven exercises',
    exercises: [
      {
        id: 'barbell-bench-press',
        name: 'Barbell Bench Press',
        sets: 4,
        reps: 8,
        weight: 80,
        restTime: 120,
        targetMuscles: ['chest'],
        secondaryMuscles: ['triceps', 'front deltoids'],
        instructions: [
          'Lie flat on bench with feet firmly on ground',
          'Grip bar slightly wider than shoulder width',
          'Lower bar to chest with control',
          'Press bar up explosively to starting position'
        ],
        difficulty: 'intermediate',
        equipment: ['barbell', 'bench'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589711/Barbell_Bench_Press_gcjt9g.png'
      },
      {
        id: 'dumbbell-bench-press',
        name: 'Dumbbell Bench Press',
        sets: 4,
        reps: 10,
        weight: 30,
        restTime: 90,
        targetMuscles: ['chest'],
        secondaryMuscles: ['triceps', 'shoulders'],
        instructions: [
          'Lie on bench holding dumbbells at chest level',
          'Press dumbbells up until arms are fully extended',
          'Lower with control to starting position',
          'Keep core tight throughout movement'
        ],
        difficulty: 'beginner',
        equipment: ['dumbbells', 'bench'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589877/Dumbbell_Bench_Press_rudvyh.png'
      },
      {
        id: '30-incline-bench-press',
        name: '30° Incline Bench Press',
        sets: 3,
        reps: 10,
        weight: 60,
        restTime: 90,
        targetMuscles: ['upper chest'],
        secondaryMuscles: ['shoulders', 'triceps'],
        instructions: [
          'Set bench to 30-degree incline',
          'Grip bar slightly wider than shoulders',
          'Lower bar to upper chest',
          'Press up focusing on upper chest contraction'
        ],
        difficulty: 'intermediate',
        equipment: ['barbell', 'incline bench'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589710/30_Incline_Bench_Press_q1hi1k.png'
      },
      {
        id: '30-incline-dumbbell-press',
        name: '30° Incline Dumbbell Press',
        sets: 3,
        reps: 12,
        weight: 25,
        restTime: 75,
        targetMuscles: ['upper chest'],
        secondaryMuscles: ['front deltoids', 'triceps'],
        instructions: [
          'Set bench to 30-degree incline',
          'Hold dumbbells at shoulder level',
          'Press up and slightly inward',
          'Lower with control to starting position'
        ],
        difficulty: 'beginner',
        equipment: ['dumbbells', 'incline bench'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589711/30_Incline_Dumbbell_Press_xq1nls.png'
      },
      {
        id: 'decline-barbell-bench-press',
        name: 'Decline Barbell Bench Press',
        sets: 3,
        reps: 10,
        weight: 70,
        restTime: 90,
        targetMuscles: ['lower chest'],
        secondaryMuscles: ['triceps', 'lats'],
        instructions: [
          'Set bench to decline position',
          'Secure feet in foot holds',
          'Lower bar to lower chest',
          'Press up with explosive movement'
        ],
        difficulty: 'intermediate',
        equipment: ['barbell', 'decline bench'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589711/Barbell_Bench_Press_gcjt9g.png'
      },
      {
        id: 'weighted-chest-dip',
        name: 'Weighted Chest Dip',
        sets: 3,
        reps: 8,
        restTime: 120,
        targetMuscles: ['lower chest'],
        secondaryMuscles: ['triceps', 'shoulders'],
        instructions: [
          'Attach weight to dip belt',
          'Grip parallel bars and lift body up',
          'Lean forward slightly for chest emphasis',
          'Lower until shoulders below elbows, then push up'
        ],
        difficulty: 'advanced',
        equipment: ['dip bars', 'weight belt'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589711/Weighted_Chest_Dip_xnmyhw.png'
      },
      {
        id: 'heavy-1-arm-crossovers',
        name: 'Heavy 1-Arm Crossovers',
        sets: 3,
        reps: 12,
        restTime: 75,
        targetMuscles: ['chest'],
        secondaryMuscles: ['biceps', 'front deltoids'],
        instructions: [
          'Set cable to chest height',
          'Grab handle with one arm',
          'Pull across body in wide arc',
          'Focus on chest squeeze at peak contraction'
        ],
        difficulty: 'advanced',
        equipment: ['cable machine'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589711/Heavy_1-Arm_Crossovers_qneea9.png'
      },
      {
        id: 'low-to-high-cable-flyes',
        name: 'Low to High Cable Flyes',
        sets: 3,
        reps: 12,
        restTime: 75,
        targetMuscles: ['upper chest'],
        secondaryMuscles: ['shoulders', 'biceps'],
        instructions: [
          'Set cables to low position',
          'Grab handles and step forward',
          'Bring handles up and together in arc motion',
          'Focus on upper chest contraction'
        ],
        difficulty: 'intermediate',
        equipment: ['cable machine'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589711/Low_to_High_Cable_Flyes_waslsy.png'
      }
    ]
  },
  {
    id: 'abs',
    name: 'Abs & Core',
    icon: '🎯',
    description: 'Strengthen your core with these effective exercises',
    exercises: [
      {
        id: 'bicycle-crunches',
        name: 'Bicycle Crunches',
        sets: 3,
        reps: 20,
        restTime: 45,
        targetMuscles: ['abs'],
        secondaryMuscles: ['obliques'],
        instructions: [
          'Lie on back with hands behind head',
          'Bring opposite elbow to knee',
          'Alternate sides in cycling motion',
          'Keep core engaged throughout'
        ],
        difficulty: 'beginner',
        equipment: ['bodyweight'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589688/Bicycle_Crunches_bmwl0t.png'
      },
      {
        id: 'barbell-floor-wiper',
        name: 'Barbell Floor Wiper',
        sets: 3,
        reps: 10,
        restTime: 90,
        targetMuscles: ['abs'],
        secondaryMuscles: ['hip flexors', 'obliques'],
        instructions: [
          'Lie on back holding barbell overhead',
          'Keep arms locked and barbell stable',
          'Rotate legs side to side like windshield wipers',
          'Control the movement throughout'
        ],
        difficulty: 'intermediate',
        equipment: ['barbell'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589688/Barbell_Floor_Wiper_n8zzd7.png'
      },
      {
        id: 'dead-bug',
        name: 'Dead Bug',
        sets: 3,
        reps: 10,
        restTime: 45,
        targetMuscles: ['abs'],
        secondaryMuscles: ['hip flexors', 'transverse abs'],
        instructions: [
          'Lie on back with arms up and knees at 90 degrees',
          'Lower opposite arm and leg slowly',
          'Return to starting position',
          'Alternate sides maintaining core stability'
        ],
        difficulty: 'beginner',
        equipment: ['bodyweight'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589689/Dead_Bug_se110l.png'
      },
      {
        id: 'hardstyle-plank',
        name: 'Hardstyle Plank',
        sets: 3,
        reps: 1,
        duration: 30,
        restTime: 60,
        targetMuscles: ['core'],
        secondaryMuscles: ['shoulders', 'glutes'],
        instructions: [
          'Start in plank position',
          'Tense entire body maximally',
          'Squeeze glutes and abs hard',
          'Hold position with maximum tension'
        ],
        difficulty: 'intermediate',
        equipment: ['bodyweight'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589689/Hardstyle_Plank_e1zthv.png'
      },
      {
        id: 'mountain-climbers',
        name: 'Mountain Climbers',
        sets: 3,
        reps: 20,
        restTime: 60,
        targetMuscles: ['abs'],
        secondaryMuscles: ['quads', 'shoulders'],
        instructions: [
          'Start in plank position',
          'Bring one knee toward chest',
          'Quickly switch legs',
          'Maintain plank position throughout'
        ],
        difficulty: 'beginner',
        equipment: ['bodyweight'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589688/Mountain_Climbers_xs4sqh.png'
      },
      {
        id: 'plank-hip-dips',
        name: 'Plank Hip Dips',
        sets: 3,
        reps: 15,
        restTime: 60,
        targetMuscles: ['obliques'],
        secondaryMuscles: ['abs', 'lower back'],
        instructions: [
          'Start in forearm plank position',
          'Rotate hips to one side',
          'Return to center and rotate to other side',
          'Keep core engaged throughout'
        ],
        difficulty: 'beginner',
        equipment: ['bodyweight'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589689/Plank_Hip_Dips_pqvsh0.png'
      },
      {
        id: 'battling-ropes',
        name: 'Battling Ropes',
        sets: 3,
        reps: 1,
        duration: 30,
        restTime: 90,
        targetMuscles: ['full body'],
        secondaryMuscles: ['shoulders', 'core'],
        instructions: [
          'Hold rope ends with both hands',
          'Create waves by moving arms up and down',
          'Keep core engaged',
          'Maintain intensity for duration'
        ],
        difficulty: 'intermediate',
        equipment: ['battle ropes'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589688/Battling_Ropes_rarhuy.png'
      },
      {
        id: 'swiss-ball-stir-the-pot',
        name: 'Swiss Ball \'Stir the Pot\'',
        sets: 3,
        reps: 10,
        restTime: 75,
        targetMuscles: ['abs'],
        secondaryMuscles: ['shoulders', 'core'],
        instructions: [
          'Place forearms on swiss ball in plank position',
          'Move forearms in circular motion',
          'Keep body straight and core tight',
          'Alternate clockwise and counterclockwise'
        ],
        difficulty: 'advanced',
        equipment: ['swiss ball'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589691/Swiss_Ball_Stir_the_Pot_mmsl0f.png'
      },
      {
        id: 'slow-hanging-leg-raises',
        name: 'Slow Hanging Leg Raises',
        sets: 3,
        reps: 8,
        restTime: 90,
        targetMuscles: ['abs'],
        secondaryMuscles: ['hip flexors', 'obliques'],
        instructions: [
          'Hang from pull-up bar',
          'Slowly raise legs to 90 degrees',
          'Lower with control',
          'Avoid swinging or momentum'
        ],
        difficulty: 'advanced',
        equipment: ['pull-up bar'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589691/Slow_Hanging_Leg_Raises_cvgxtq.png'
      },
      {
        id: 'weighted-russian-twists',
        name: 'Weighted Russian Twists',
        sets: 3,
        reps: 20,
        restTime: 60,
        targetMuscles: ['obliques'],
        secondaryMuscles: ['abs', 'core'],
        instructions: [
          'Sit with knees bent holding weight',
          'Lean back slightly and lift feet',
          'Rotate torso side to side',
          'Touch weight to ground beside hips'
        ],
        difficulty: 'intermediate',
        equipment: ['weight plate', 'dumbbell'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589691/Weighted_Russian_Twists_k35lqg.png'
      },
      {
        id: 'hollow-holds',
        name: 'Hollow Holds',
        sets: 3,
        reps: 1,
        duration: 30,
        restTime: 60,
        targetMuscles: ['core'],
        secondaryMuscles: ['abs', 'hip flexors'],
        instructions: [
          'Lie on back with arms overhead',
          'Press lower back into floor',
          'Lift shoulders and legs off ground',
          'Hold hollow body position'
        ],
        difficulty: 'intermediate',
        equipment: ['bodyweight'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589689/Hollow_Holds_i3z1bx.png'
      },
      {
        id: 'cable-crunch',
        name: 'Cable Crunch',
        sets: 3,
        reps: 15,
        restTime: 60,
        targetMuscles: ['abs'],
        secondaryMuscles: ['obliques'],
        instructions: [
          'Kneel in front of cable machine',
          'Hold rope attachment at head level',
          'Crunch down bringing elbows to knees',
          'Focus on abs contraction'
        ],
        difficulty: 'beginner',
        equipment: ['cable machine'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589689/Cable_Crunch_xvbsx3.png'
      }
    ]
  },
  {
    id: 'shoulders',
    name: 'Shoulders',
    icon: '🏆',
    description: 'Build impressive shoulders with these targeted exercises',
    exercises: [
      {
        id: 'barbell-overhead-press',
        name: 'Barbell Overhead Press',
        sets: 4,
        reps: 8,
        weight: 50,
        restTime: 120,
        targetMuscles: ['shoulders'],
        secondaryMuscles: ['triceps', 'traps', 'core'],
        instructions: [
          'Stand with feet shoulder-width apart',
          'Hold bar at shoulder height',
          'Press bar overhead until arms fully extended',
          'Lower with control to starting position'
        ],
        difficulty: 'intermediate',
        equipment: ['barbell'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589714/Barbell_Overhead_Press_ldt9pg.png'
      },
      {
        id: 'arnold-press',
        name: 'Arnold Press',
        sets: 3,
        reps: 10,
        weight: 20,
        restTime: 75,
        targetMuscles: ['shoulders'],
        secondaryMuscles: ['biceps', 'triceps'],
        instructions: [
          'Start with dumbbells at shoulder height, palms facing you',
          'Rotate palms outward as you press up',
          'Finish with palms facing forward overhead',
          'Reverse the motion on the way down'
        ],
        difficulty: 'intermediate',
        equipment: ['dumbbells'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589714/Arnold_Press_kgvkam.png'
      },
      {
        id: 'seated-dumbbell-shoulder-press',
        name: 'Seated Dumbbell Shoulder Press',
        sets: 3,
        reps: 12,
        weight: 25,
        restTime: 90,
        targetMuscles: ['shoulders'],
        secondaryMuscles: ['triceps'],
        instructions: [
          'Sit on bench with back support',
          'Hold dumbbells at shoulder level',
          'Press up until arms are fully extended',
          'Lower with control to starting position'
        ],
        difficulty: 'beginner',
        equipment: ['dumbbells', 'bench'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589715/Seated_Dumbbell_Shoulder_Press_aqmxmk.png'
      },
      {
        id: 'leaning-cable-lateral-raise',
        name: 'Leaning Cable Lateral Raise',
        sets: 3,
        reps: 12,
        restTime: 60,
        targetMuscles: ['shoulders'],
        secondaryMuscles: ['traps'],
        instructions: [
          'Stand beside cable machine and lean away',
          'Grab handle with far hand',
          'Raise arm out to side until parallel to floor',
          'Lower with control'
        ],
        difficulty: 'intermediate',
        equipment: ['cable machine'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589715/Leaning_Cable_Lateral_Raise_g3cgnv.png'
      },
      {
        id: 'dumbbell-lateral-raise',
        name: 'Dumbbell Lateral Raise',
        sets: 3,
        reps: 12,
        weight: 15,
        restTime: 60,
        targetMuscles: ['shoulders'],
        secondaryMuscles: ['traps'],
        instructions: [
          'Hold dumbbells at sides',
          'Raise arms out to sides until parallel to floor',
          'Lead with pinkies, slight bend in elbows',
          'Lower with control'
        ],
        difficulty: 'beginner',
        equipment: ['dumbbells'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589714/Dumbbell_Lateral_Raise_w5z9fy.png'
      },
      {
        id: 'behind-the-back-cable-lateral-raise',
        name: 'Behind-The-Back Cable Lateral Raise',
        sets: 3,
        reps: 12,
        restTime: 75,
        targetMuscles: ['shoulders'],
        secondaryMuscles: ['traps', 'rear delts'],
        instructions: [
          'Stand with cable machine behind you',
          'Grab handle and position behind back',
          'Raise arm out to side',
          'Focus on shoulder isolation'
        ],
        difficulty: 'advanced',
        equipment: ['cable machine'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589714/Behind-The-Back_Cable_Lateral_Raise_nd5uh0.png'
      },
      {
        id: 'w-raises',
        name: '"W" Raises',
        sets: 3,
        reps: 15,
        weight: 10,
        restTime: 60,
        targetMuscles: ['rear delts'],
        secondaryMuscles: ['rotator cuff', 'traps'],
        instructions: [
          'Lie face down on incline bench',
          'Hold light dumbbells with arms in W shape',
          'Raise arms up squeezing shoulder blades',
          'Focus on rear deltoid contraction'
        ],
        difficulty: 'intermediate',
        equipment: ['dumbbells', 'incline bench'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589715/W_Raises_v8xeks.png'
      },
      {
        id: 'incline-y-raise',
        name: 'Incline Y Raise',
        sets: 3,
        reps: 12,
        weight: 8,
        restTime: 60,
        targetMuscles: ['rear delts'],
        secondaryMuscles: ['traps', 'rotator cuff'],
        instructions: [
          'Lie face down on incline bench',
          'Hold light dumbbells with arms in Y shape',
          'Raise arms up and out',
          'Squeeze shoulder blades together'
        ],
        difficulty: 'intermediate',
        equipment: ['dumbbells', 'incline bench'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589714/Incline_Y_Raise_xwuy6e.png'
      },
      {
        id: 'cable-face-pull',
        name: 'Cable Face Pull',
        sets: 3,
        reps: 15,
        restTime: 60,
        targetMuscles: ['rear delts'],
        secondaryMuscles: ['traps', 'rhomboids'],
        instructions: [
          'Set cable to face height with rope attachment',
          'Pull rope toward face separating hands',
          'Focus on pulling elbows back',
          'Squeeze shoulder blades together'
        ],
        difficulty: 'intermediate',
        equipment: ['cable machine'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589714/Cable_Face_Pull_bq8g3o.png'
      }
    ]
  },
  {
    id: 'legs',
    name: 'Legs',
    icon: '🦵',
    description: 'Build powerful legs with these compound and isolation exercises',
    exercises: [
      {
        id: 'barbell-squats',
        name: 'Barbell Squats',
        sets: 4,
        reps: 12,
        weight: 80,
        restTime: 120,
        targetMuscles: ['quads'],
        secondaryMuscles: ['glutes', 'hamstrings', 'core'],
        instructions: [
          'Stand with feet shoulder-width apart',
          'Lower body as if sitting back into chair',
          'Keep chest up and knees behind toes',
          'Push through heels to return to standing'
        ],
        difficulty: 'intermediate',
        equipment: ['barbell', 'squat rack'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589712/Barbell_Squats_gzdsho.png'
      },
      {
        id: 'leg-press',
        name: 'Leg Press',
        sets: 3,
        reps: 15,
        weight: 120,
        restTime: 90,
        targetMuscles: ['quads'],
        secondaryMuscles: ['glutes', 'hamstrings'],
        instructions: [
          'Sit in leg press machine',
          'Place feet shoulder-width apart on platform',
          'Lower weight until knees at 90 degrees',
          'Press through heels to extend legs'
        ],
        difficulty: 'beginner',
        equipment: ['leg press machine'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589712/Leg_Press_klurrb.png'
      },
      {
        id: 'seated-leg-extension',
        name: 'Seated Leg Extension',
        sets: 3,
        reps: 15,
        restTime: 60,
        targetMuscles: ['quads'],
        secondaryMuscles: [],
        instructions: [
          'Sit in leg extension machine',
          'Position ankles behind pad',
          'Extend legs until fully straight',
          'Lower with control'
        ],
        difficulty: 'beginner',
        equipment: ['leg extension machine'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589713/Seated_Leg_Extension_r6jm7i.png'
      },
      {
        id: 'hack-squats',
        name: 'Hack Squats',
        sets: 3,
        reps: 12,
        weight: 100,
        restTime: 90,
        targetMuscles: ['quads'],
        secondaryMuscles: ['glutes', 'calves'],
        instructions: [
          'Position yourself in hack squat machine',
          'Place feet shoulder-width apart on platform',
          'Lower until thighs parallel to platform',
          'Push through heels to return to start'
        ],
        difficulty: 'intermediate',
        equipment: ['hack squat machine'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589712/Hack_Squats_ovzcye.png'
      },
      {
        id: 'lunges',
        name: 'Lunges',
        sets: 3,
        reps: 12,
        restTime: 75,
        targetMuscles: ['quads'],
        secondaryMuscles: ['glutes', 'hamstrings', 'calves'],
        instructions: [
          'Step forward into lunge position',
          'Lower back knee toward ground',
          'Keep front knee over ankle',
          'Push through front heel to return'
        ],
        difficulty: 'intermediate',
        equipment: ['bodyweight', 'dumbbells'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589712/Lunges_drejub.png'
      },
      {
        id: 'romanian-deadlift',
        name: 'Romanian Deadlift',
        sets: 3,
        reps: 10,
        weight: 60,
        restTime: 90,
        targetMuscles: ['hamstrings'],
        secondaryMuscles: ['glutes', 'lower back'],
        instructions: [
          'Hold bar with overhand grip',
          'Keep slight bend in knees',
          'Hinge at hips lowering bar',
          'Feel stretch in hamstrings, return to standing'
        ],
        difficulty: 'intermediate',
        equipment: ['barbell'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589713/Romanian_Deadlift_mnpmlb.png'
      },
      {
        id: 'lying-leg-curl',
        name: 'Lying Leg Curl',
        sets: 3,
        reps: 12,
        restTime: 60,
        targetMuscles: ['hamstrings'],
        secondaryMuscles: ['calves'],
        instructions: [
          'Lie face down on leg curl machine',
          'Position ankles under pad',
          'Curl heels toward glutes',
          'Lower with control'
        ],
        difficulty: 'beginner',
        equipment: ['leg curl machine'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589712/Lying_Leg_Curl_xhvqx2.png'
      },
      {
        id: 'nordic-hamstrings',
        name: 'Nordic Hamstrings',
        sets: 3,
        reps: 5,
        restTime: 120,
        targetMuscles: ['hamstrings'],
        secondaryMuscles: ['glutes', 'core'],
        instructions: [
          'Kneel with feet secured behind you',
          'Slowly lower body forward',
          'Use hamstrings to control descent',
          'Push back up to starting position'
        ],
        difficulty: 'advanced',
        equipment: ['bodyweight'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589713/Nordic_Hamstrings_hty6og.png'
      },
      {
        id: 'barbell-hip-thrust',
        name: 'Barbell Hip Thrust',
        sets: 3,
        reps: 12,
        weight: 60,
        restTime: 90,
        targetMuscles: ['glutes'],
        secondaryMuscles: ['hamstrings', 'core'],
        instructions: [
          'Sit with back against bench, barbell over hips',
          'Plant feet firmly on ground',
          'Drive hips up squeezing glutes',
          'Lower with control'
        ],
        difficulty: 'intermediate',
        equipment: ['barbell', 'bench'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589712/Barbell_Hip_Thrust_yvg9rw.png'
      },
      {
        id: 'seated-dumbbell-calf-raise',
        name: 'Seated Dumbbell Calf Raise',
        sets: 4,
        reps: 15,
        weight: 25,
        restTime: 45,
        targetMuscles: ['calves'],
        secondaryMuscles: [],
        instructions: [
          'Sit on bench with dumbbell on thighs',
          'Place balls of feet on platform',
          'Rise up on toes as high as possible',
          'Lower with control'
        ],
        difficulty: 'beginner',
        equipment: ['dumbbell', 'bench'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589713/Seated_Dumbbell_Calf_Raise_yqoeyf.png'
      },
      {
        id: 'one-leg-dumbbell-calf-raise',
        name: 'One Leg Dumbbell Calf Raise',
        sets: 3,
        reps: 12,
        weight: 20,
        restTime: 60,
        targetMuscles: ['calves'],
        secondaryMuscles: [],
        instructions: [
          'Hold dumbbell in one hand',
          'Stand on one foot on platform',
          'Rise up on toe as high as possible',
          'Lower with control, switch legs'
        ],
        difficulty: 'intermediate',
        equipment: ['dumbbell', 'platform'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589713/One_Leg_Dumbbell_Calf_Raise_yfn3n5.png'
      },
      {
        id: 'seated-calf-raise-leg-press',
        name: 'Seated Calf Raise – Leg Press Machine',
        sets: 4,
        reps: 20,
        restTime: 45,
        targetMuscles: ['calves'],
        secondaryMuscles: [],
        instructions: [
          'Sit in leg press machine',
          'Place balls of feet on bottom of platform',
          'Press through toes extending ankles',
          'Lower with control'
        ],
        difficulty: 'beginner',
        equipment: ['leg press machine'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589713/Seated_Calf_Raise_Leg_Press_Machine_mftrec.png'
      }
    ]
  },
  {
    id: 'arms',
    name: 'Arms',
    icon: '💪',
    description: 'Build impressive arms with bicep and tricep exercises',
    exercises: [
      // Triceps
      {
        id: 'close-grip-bench-press',
        name: 'Close-Grip Bench Press',
        sets: 3,
        reps: 10,
        weight: 60,
        restTime: 90,
        targetMuscles: ['triceps'],
        secondaryMuscles: ['chest', 'front delts'],
        instructions: [
          'Lie on bench with narrow grip on bar',
          'Keep elbows close to body',
          'Lower bar to chest',
          'Press up focusing on tricep contraction'
        ],
        difficulty: 'intermediate',
        equipment: ['barbell', 'bench'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589693/Close-Grip_Bench_Press_dqe1cy.png'
      },
      {
        id: 'dumbbell-overhead-triceps-extension',
        name: 'Dumbbell Overhead Triceps Extension',
        sets: 3,
        reps: 12,
        weight: 25,
        restTime: 75,
        targetMuscles: ['triceps'],
        secondaryMuscles: ['shoulders', 'core'],
        instructions: [
          'Hold dumbbell overhead with both hands',
          'Lower weight behind head by bending elbows',
          'Keep upper arms stationary',
          'Extend arms back to starting position'
        ],
        difficulty: 'beginner',
        equipment: ['dumbbell'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589693/Dumbbell_Overhead_Triceps_Extension_cqxsxd.png'
      },
      {
        id: 'triceps-cable-rope-pushdown',
        name: 'Triceps Cable Rope Pushdown',
        sets: 3,
        reps: 12,
        restTime: 60,
        targetMuscles: ['triceps'],
        secondaryMuscles: ['forearms'],
        instructions: [
          'Stand at cable machine with rope attachment',
          'Keep elbows at sides',
          'Push rope down until arms fully extended',
          'Control the return movement'
        ],
        difficulty: 'beginner',
        equipment: ['cable machine'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589693/Triceps_Cable_Rope_Pushdown_qmfowk.png'
      },
      {
        id: 'cable-overhead-extension-rope',
        name: 'Cable Overhead Extension With Rope',
        sets: 3,
        reps: 12,
        restTime: 75,
        targetMuscles: ['triceps'],
        secondaryMuscles: ['shoulders'],
        instructions: [
          'Face away from cable machine',
          'Hold rope overhead with arms extended',
          'Lower rope behind head by bending elbows',
          'Extend arms back to starting position'
        ],
        difficulty: 'intermediate',
        equipment: ['cable machine'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589692/Cable_Overhead_Extension_With_Rope_xtnnhm.png'
      },
      {
        id: 'ez-bar-skullcrusher',
        name: 'EZ-Bar Skullcrusher',
        sets: 3,
        reps: 10,
        weight: 30,
        restTime: 90,
        targetMuscles: ['triceps'],
        secondaryMuscles: ['forearms'],
        instructions: [
          'Lie on bench holding EZ-bar overhead',
          'Lower bar toward forehead by bending elbows',
          'Keep upper arms stationary',
          'Extend arms back to starting position'
        ],
        difficulty: 'intermediate',
        equipment: ['ez-bar', 'bench'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589693/EZ-Bar_Skullcrusher_bvqxxl.png'
      },
      {
        id: 'triceps-machine-dip',
        name: 'Triceps Machine Dip',
        sets: 3,
        reps: 12,
        restTime: 75,
        targetMuscles: ['triceps'],
        secondaryMuscles: ['chest', 'shoulders'],
        instructions: [
          'Sit in triceps dip machine',
          'Grip handles and press down',
          'Focus on triceps contraction',
          'Control the return movement'
        ],
        difficulty: 'beginner',
        equipment: ['triceps dip machine'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589693/Triceps_Machine_Dip_cqlffz.png'
      },
      // Biceps
      {
        id: 'barbell-biceps-curls',
        name: 'Barbell Biceps Curls',
        sets: 3,
        reps: 12,
        weight: 30,
        restTime: 60,
        targetMuscles: ['biceps'],
        secondaryMuscles: ['forearms'],
        instructions: [
          'Stand with feet shoulder-width apart',
          'Hold barbell with underhand grip',
          'Curl bar up toward shoulders',
          'Lower with control'
        ],
        difficulty: 'beginner',
        equipment: ['barbell'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589691/Barbell_Biceps_Curls_rayz2i.png'
      },
      {
        id: 'close-grip-concentration-barbell-curl',
        name: 'Close-Grip Concentration Barbell Curl',
        sets: 3,
        reps: 10,
        weight: 25,
        restTime: 75,
        targetMuscles: ['biceps'],
        secondaryMuscles: ['forearms'],
        instructions: [
          'Sit on bench with barbell between legs',
          'Use close grip on barbell',
          'Curl up focusing on bicep contraction',
          'Lower with control'
        ],
        difficulty: 'intermediate',
        equipment: ['barbell', 'bench'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589692/Close-Grip_Concentration_Barbell_Curl_zspqmt.png'
      },
      {
        id: 'cable-rope-hammer-curl',
        name: 'Cable Rope Hammer Curl',
        sets: 3,
        reps: 12,
        restTime: 60,
        targetMuscles: ['biceps'],
        secondaryMuscles: ['brachialis', 'forearms'],
        instructions: [
          'Stand at cable machine with rope attachment',
          'Hold rope with neutral grip',
          'Curl up keeping wrists straight',
          'Focus on bicep and forearm contraction'
        ],
        difficulty: 'beginner',
        equipment: ['cable machine'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589692/Cable_Rope_Hammer_Curl_xo0r9u.png'
      },
      {
        id: 'cable-curl',
        name: 'Cable Curl',
        sets: 3,
        reps: 12,
        restTime: 60,
        targetMuscles: ['biceps'],
        secondaryMuscles: ['forearms'],
        instructions: [
          'Stand at cable machine with bar attachment',
          'Hold bar with underhand grip',
          'Curl up toward shoulders',
          'Lower with control'
        ],
        difficulty: 'beginner',
        equipment: ['cable machine'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589691/Cable_Curl_xtvxck.png'
      },
      {
        id: 'dumbbell-curl',
        name: 'Dumbbell Curl',
        sets: 3,
        reps: 12,
        weight: 20,
        restTime: 60,
        targetMuscles: ['biceps'],
        secondaryMuscles: ['forearms'],
        instructions: [
          'Hold dumbbells at sides with palms facing forward',
          'Curl weights up toward shoulders',
          'Keep elbows stationary at sides',
          'Lower with control'
        ],
        difficulty: 'beginner',
        equipment: ['dumbbells'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589692/Dumbbell_Curl_t6pcas.png'
      },
      {
        id: 'incline-dumbbell-hammer-curl',
        name: 'Incline Dumbbell Hammer Curl',
        sets: 3,
        reps: 10,
        weight: 18,
        restTime: 75,
        targetMuscles: ['biceps'],
        secondaryMuscles: ['brachialis'],
        instructions: [
          'Sit on incline bench with dumbbells',
          'Hold with neutral grip (palms facing each other)',
          'Curl up keeping wrists straight',
          'Focus on bicep contraction'
        ],
        difficulty: 'intermediate',
        equipment: ['dumbbells', 'incline bench'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589692/Incline_Dumbbell_Hammer_Curl_wrtfeu.png'
      },
      {
        id: 'ez-bar-preacher-curl',
        name: 'EZ-Bar Preacher Curl',
        sets: 3,
        reps: 10,
        weight: 25,
        restTime: 75,
        targetMuscles: ['biceps'],
        secondaryMuscles: ['forearms'],
        instructions: [
          'Sit at preacher bench with EZ-bar',
          'Position arms on angled pad',
          'Curl bar up focusing on biceps',
          'Lower with control'
        ],
        difficulty: 'intermediate',
        equipment: ['ez-bar', 'preacher bench'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589692/EZ-Bar_Preacher_Curl_lemecs.png'
      },
      {
        id: 'barbell-drag-curl',
        name: 'Barbell Drag Curl',
        sets: 3,
        reps: 10,
        weight: 25,
        restTime: 75,
        targetMuscles: ['biceps'],
        secondaryMuscles: ['rear delts'],
        instructions: [
          'Hold barbell with underhand grip',
          'Drag bar up body keeping it close',
          'Pull elbows back as you curl',
          'Focus on bicep contraction'
        ],
        difficulty: 'intermediate',
        equipment: ['barbell'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589691/Barbell_Drag_Curl_nlovi9.png'
      },
      {
        id: 'reverse-grip-cable-biceps-curl',
        name: 'Reverse-Grip Cable Biceps Curl',
        sets: 3,
        reps: 12,
        restTime: 60,
        targetMuscles: ['biceps'],
        secondaryMuscles: ['forearms'],
        instructions: [
          'Stand at cable machine with bar attachment',
          'Hold bar with overhand grip',
          'Curl up toward shoulders',
          'Focus on bicep and forearm activation'
        ],
        difficulty: 'intermediate',
        equipment: ['cable machine'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589692/Reverse-Grip_Cable_Biceps_Curl_poq9lj.png'
      }
    ]
  },
  {
    id: 'back',
    name: 'Back',
    icon: '🏋️',
    description: 'Develop a strong, wide back with these exercises',
    exercises: [
      {
        id: 'bent-over-barbell-row',
        name: 'Bent-Over Barbell Row',
        sets: 4,
        reps: 10,
        weight: 70,
        restTime: 90,
        targetMuscles: ['lats'],
        secondaryMuscles: ['rhomboids', 'rear delts'],
        instructions: [
          'Bend at hips with slight knee bend',
          'Hold bar with overhand grip',
          'Pull bar to lower chest/upper abdomen',
          'Squeeze shoulder blades together'
        ],
        difficulty: 'intermediate',
        equipment: ['barbell'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589694/Bent-Over_Barbell_Row_jmwrpz.png'
      },
      {
        id: 'landmine-row',
        name: 'Landmine Row',
        sets: 3,
        reps: 12,
        weight: 45,
        restTime: 90,
        targetMuscles: ['lats'],
        secondaryMuscles: ['rear delts', 'core'],
        instructions: [
          'Position barbell in landmine attachment',
          'Straddle bar and bend at hips',
          'Pull bar to chest',
          'Focus on lat contraction'
        ],
        difficulty: 'intermediate',
        equipment: ['barbell', 'landmine attachment'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589694/Landmine_Row_e7x5sj.png'
      },
      {
        id: 'kroc-row',
        name: 'Kroc Row',
        sets: 3,
        reps: 15,
        weight: 40,
        restTime: 90,
        targetMuscles: ['lats'],
        secondaryMuscles: ['rhomboids', 'grip'],
        instructions: [
          'Place one knee and hand on bench',
          'Hold heavy dumbbell in opposite hand',
          'Row with explosive movement',
          'Focus on lat stretch and contraction'
        ],
        difficulty: 'advanced',
        equipment: ['dumbbell', 'bench'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589694/Kroc_Row_ktvcgj.png'
      },
      {
        id: 'meadows-row',
        name: 'Meadows Row',
        sets: 3,
        reps: 10,
        weight: 35,
        restTime: 90,
        targetMuscles: ['lats'],
        secondaryMuscles: ['core', 'rear delts'],
        instructions: [
          'Position barbell in landmine at side',
          'Grab end of bar with one hand',
          'Row bar to hip',
          'Focus on lat contraction and core stability'
        ],
        difficulty: 'advanced',
        equipment: ['barbell', 'landmine attachment'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589695/Meadows_Row_hbeupr.png'
      },
      {
        id: 'pendlay-row',
        name: 'Pendlay Row',
        sets: 4,
        reps: 8,
        weight: 80,
        restTime: 120,
        targetMuscles: ['upper back'],
        secondaryMuscles: ['traps', 'rear delts'],
        instructions: [
          'Start with bar on floor',
          'Bend over maintaining flat back',
          'Explosively row bar to chest',
          'Return bar to floor between reps'
        ],
        difficulty: 'advanced',
        equipment: ['barbell'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589695/Pendlay_Row_bbd63e.png'
      },
      {
        id: 'seated-cable-row',
        name: 'Seated Cable Row',
        sets: 3,
        reps: 12,
        weight: 50,
        restTime: 75,
        targetMuscles: ['mid back'],
        secondaryMuscles: ['biceps', 'rhomboids'],
        instructions: [
          'Sit at cable row machine',
          'Pull handle to lower chest',
          'Squeeze shoulder blades together',
          'Control the return movement'
        ],
        difficulty: 'beginner',
        equipment: ['cable machine'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589695/Seated_Cable_Row_rmnkj1.png'
      },
      {
        id: 'lat-pulldown',
        name: 'Lat Pulldown',
        sets: 3,
        reps: 12,
        weight: 60,
        restTime: 75,
        targetMuscles: ['lats'],
        secondaryMuscles: ['biceps', 'rear delts'],
        instructions: [
          'Sit at lat pulldown machine',
          'Grip bar wider than shoulder width',
          'Pull bar down to upper chest',
          'Focus on using back muscles, not arms'
        ],
        difficulty: 'beginner',
        equipment: ['lat pulldown machine'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589695/Lat_Pulldown_uztc2x.png'
      },
      {
        id: 'cable-rope-pullover',
        name: 'Cable Rope Pullover',
        sets: 3,
        reps: 12,
        restTime: 75,
        targetMuscles: ['lats'],
        secondaryMuscles: ['triceps', 'core'],
        instructions: [
          'Stand at cable machine with rope attachment',
          'Hold rope overhead with arms extended',
          'Pull rope down in arc motion',
          'Focus on lat contraction'
        ],
        difficulty: 'beginner',
        equipment: ['cable machine'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589694/Cable_Rope_Pullover_cavudg.png'
      },
      {
        id: 'straight-arm-pulldown',
        name: 'Straight-Arm Pulldown',
        sets: 3,
        reps: 12,
        restTime: 60,
        targetMuscles: ['lats'],
        secondaryMuscles: ['triceps'],
        instructions: [
          'Stand at cable machine with bar attachment',
          'Keep arms straight throughout movement',
          'Pull bar down to thighs',
          'Focus on lat contraction'
        ],
        difficulty: 'beginner',
        equipment: ['cable machine'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589710/Straight-Arm_Pulldown_w43p06.png'
      },
      {
        id: 'barbell-shrug',
        name: 'Barbell Shrug',
        sets: 3,
        reps: 15,
        weight: 60,
        restTime: 60,
        targetMuscles: ['traps'],
        secondaryMuscles: ['upper back', 'neck'],
        instructions: [
          'Hold barbell with overhand grip',
          'Shrug shoulders up toward ears',
          'Hold contraction briefly',
          'Lower with control'
        ],
        difficulty: 'beginner',
        equipment: ['barbell'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589694/Barbell_Shrug_efh2ys.png'
      },
      {
        id: 'cable-trap-shrug',
        name: 'Cable Trap Shrug',
        sets: 3,
        reps: 15,
        restTime: 60,
        targetMuscles: ['traps'],
        secondaryMuscles: ['rear delts'],
        instructions: [
          'Stand at cable machine with bar attachment',
          'Hold bar with overhand grip',
          'Shrug shoulders up',
          'Focus on trap contraction'
        ],
        difficulty: 'beginner',
        equipment: ['cable machine'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589694/Cable_Trap_Shrug_ngfdry.png'
      },
      {
        id: 'barbell-behind-the-back-shrug',
        name: 'Barbell Behind-the-Back Shrug',
        sets: 3,
        reps: 12,
        weight: 50,
        restTime: 75,
        targetMuscles: ['traps'],
        secondaryMuscles: ['forearms', 'upper back'],
        instructions: [
          'Hold barbell behind back with overhand grip',
          'Shrug shoulders up and back',
          'Focus on trap contraction',
          'Lower with control'
        ],
        difficulty: 'intermediate',
        equipment: ['barbell'],
        image: 'https://res.cloudinary.com/dwkiuclty/image/upload/v1752589693/Barbell_Behind-the-Back_Shrug_cpzy49.png'
      }
    ]
  }
];

// Helper functions for the workout library
export const getExercisesByMuscleGroup = (muscleGroup: string): ExerciseDetail[] => {
  const category = workoutLibrary.find(cat => cat.id === muscleGroup);
  return category ? category.exercises : [];
};

export const getAllExercises = (): ExerciseDetail[] => {
  return workoutLibrary.flatMap(category => category.exercises);
};

export const getExerciseById = (id: string): ExerciseDetail | undefined => {
  return getAllExercises().find(exercise => exercise.id === id);
};

export const getExercisesByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): ExerciseDetail[] => {
  return getAllExercises().filter(exercise => exercise.difficulty === difficulty);
};

export const getExercisesByEquipment = (equipment: string): ExerciseDetail[] => {
  return getAllExercises().filter(exercise => exercise.equipment.includes(equipment));
};