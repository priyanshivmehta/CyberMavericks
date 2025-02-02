
import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const exercises = [
  { id: '1', name: 'Cat-Cow Stretch', issue: 'Lower Back Pain - for 60 sec', imageUrl: 'https://www.verywellfit.com/thmb/fs76ElRyXEifvR6wLcdmKS6MEgs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/About-A3-CatCow-019-570d44f83df78c7d9e3c571e.jpg' },
  { id: '2', name: 'Child’s Pose', issue: 'Lower Back Pain - for 60 sec', imageUrl: 'https://www.theyogacollective.com/wp-content/uploads/2019/10/4143473057707883372_IMG_8546-2-1200x800.jpg' },
  { id: '3', name: 'Hamstring Stretch', issue: 'Knee Pain - for 30 sec', imageUrl: 'https://www.verywellfit.com/thmb/CYtzFo979FjpW5-wz0V8Hge29xQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7-downdog-56f98e3d3df78c7841935724.jpg' },
  { id: '4', name: 'Step-Ups', issue: 'Knee Pain', imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.c7FSYvl4nwjlTyATIXStpAHaHa&pid=Api' },
  { id: '5', name: 'Bridge Exercise', issue: 'Flexibility & Strength', imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.T4NkyGYRMa2Kk4YTSVM3kAHaEJ&pid=Api' },
  { id: '6', name: 'Quadriceps Stretch', issue: 'Knee Pain', imageUrl: 'https://www.verywellfit.com/thmb/ZhebQCbptSAeqWEms7TEzve85dY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Verywell-30-2696366-StandingStretch-2106-5993552eb501e800127d38d3.jpg' },
  { id: '7', name: 'Quad sets', issue: 'Knee Pain', imageUrl: 'https://menskool-site.s3.ap-south-1.amazonaws.com/short_arc_a64053fe3f.gif' },
  { id: '8', name: 'Hip Flexor Stretch', issue: 'Flexibility & Strength', imageUrl: 'https://app-media.fitbod.me/v2/485/images/landscape/0_960x540.jpg' },
  { id: '9', name: 'Plank', issue: 'Flexibility & Strength', imageUrl: 'https://www.shape.com/thmb/T2GyvzFah3XYR8_L8W16ANWBTXs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/low-plank-hold-b8a63da1ef844f00b6f6a21141ba1d87.jpg' },
  { id: '10', name: 'Bodyweight Squats', issue: 'Flexibility & Strength', imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/man-exercising-at-home-royalty-free-image-1645047847.jpg' },
  { id: '11', name: 'Knee-to-chest Stretch', issue: 'Lower Back Pain', imageUrl: 'https://d20bb9v528piij.cloudfront.net/14.3/en-us/abo6363/SD/abo6363_1280x720.jpg' },
  { id: '12', name: 'Pelvic Tilt', issue: 'Lower Back Pain', imageUrl: 'https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322684/sit-up.gif' },
  { id: '13', name: 'Calf Stretch', issue: 'Calf Pain', imageUrl: 'https://media.istockphoto.com/id/847138096/photo/strong-man-stretching-calf-and-leaning-on-wall.jpg?s=612x612&w=0&k=20&c=nvne2lJhp9P4uc6yfkjoIy-TDc0i3N-ohpm7vJJm8Fg=' },
  { id: '14', name: 'Seated Calf Stretch', issue: 'Calf Pain', imageUrl: 'https://www.bodybuildingindia.com/cdn/shop/articles/seated-calf-stretch.jpg?v=1633697064' },
  { id: '15', name: 'Jump Rope', issue: 'Calf Pain', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRej6WrqLcCzg2eL1QaqVnyVU3x1gb-gtd3bVk24BrxZIAj_UuAl1hsR3v1AxCGquOHJXE&usqp=CAU' },
  { id: '16', name: 'Calf Press on Leg Press Machine', issue: 'Calf Pain', imageUrl: 'https://www.puregym.com/media/25lfd3ff/thumbnail_leg-press-calf-raise.jpg?quality=80' },
];

export default function ExerciseRecommendation() {
  const [selectedIssue, setSelectedIssue] = useState(null);

  const filteredExercises = selectedIssue
    ? exercises.filter(exercise => exercise.issue.includes(selectedIssue))
    : exercises;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Fitness Guide 🏋🏻</Text>
      </View>
      
      {/* Filter Section */}
      <View style={styles.filterWrapper}>
        <ScrollView 
          horizontal
          contentContainerStyle={styles.filterContainer} 
          showsHorizontalScrollIndicator={false}
        >
          {['All', 'Lower Back Pain', 'Knee Pain', 'Flexibility & Strength', 'Calf Pain'].map(issue => (
            <TouchableOpacity
              key={issue}
              style={[styles.filterButton, selectedIssue === issue ? styles.activeFilter : null]}
              onPress={() => setSelectedIssue(issue === 'All' ? null : issue)}
            >
              <Text style={styles.filterText}>{issue}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Exercises List */}
      <View style={styles.listWrapper}>
        <FlatList
          data={filteredExercises}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <Text style={styles.exerciseName}>{item.name}</Text>
              <Text style={styles.exerciseIssue}>{item.issue}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f0f8ff' },
  header: {
    backgroundColor: "#3867a1",
    padding: 23,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
  },
  headerText: { fontSize: 20, fontWeight: "bold", color: "white" },
  filterWrapper: { height: 50, justifyContent: 'center' }, // Ensures filter section is fixed
  filterContainer: { flexDirection: 'row', alignItems: 'center' },
  filterButton: { paddingVertical: 8, paddingHorizontal: 15, marginHorizontal: 5, backgroundColor: '#ccc', borderRadius: 10 },
  activeFilter: { backgroundColor: '#3867a1' },
  filterText: { color: 'white', fontWeight: 'bold' },
  listWrapper: { flex: 1, marginTop: 10 }, // Separates filter from list
  card: { backgroundColor: 'white', padding: 10, borderRadius: 10, marginBottom: 10, alignItems: 'center', width: '100%' },
  image: { width: '100%', height: 150, borderRadius: 10 },
  exerciseName: { fontSize: 18, fontWeight: 'bold', marginTop: 5 },
  exerciseIssue: { fontSize: 14, color: 'gray' },
});

