// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import * as Location from "expo-location";

// export default function NearbyHospitals() {
//   const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  
//   interface Hospital {
//     geometry: {
//       location: {
//         lat: number;
//         lng: number;
//       };
//     };
//     name: string;
//     vicinity: string;
//   }

//   const [hospitals, setHospitals] = useState<Hospital[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert("Permission Denied", "Allow location access to see nearby hospitals.");
//         setLoading(false);
//         return;
//       }

//       let userLocation = await Location.getCurrentPositionAsync({});
//       setLocation(userLocation.coords);
//       fetchNearbyHospitals(userLocation.coords.latitude, userLocation.coords.longitude);
//     })();
//   }, []);

//   const fetchNearbyHospitals = async (latitude: number, longitude: number) => {
//     const apiKey = "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"; // Replace with your actual API key
//     const radius = 10000; // 5 km range
//     const type = "Hospital";

//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`
//       );
//       const data = await response.json();
      
//       console.log("Hospital Data:", JSON.stringify(data, null, 2)); // Debug API response
      
//       if (data.results && data.results.length > 0) {
//         setHospitals(data.results);
//       } else {
//         Alert.alert("No Hospitals Found", "No hospitals were found nearby. Try increasing the search radius.");
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to fetch hospitals.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#007BFF" />
//       ) : location ? (
//         <MapView
//           style={styles.map}
//           initialRegion={{
//             latitude: location.latitude,
//             longitude: location.longitude,
//             latitudeDelta: 0.05,
//             longitudeDelta: 0.05,
//           }}
//         >
//           {/* User Location Marker */}
//           <Marker
//             coordinate={{ latitude: location.latitude, longitude: location.longitude }}
//             title="You Are Here"
//             pinColor="blue"
//           />

//           {/* Nearby Hospitals Markers */}
//           {hospitals.length > 0 ? (
//             hospitals.map((hospital, index) =>
//               hospital.geometry && hospital.geometry.location ? (
//                 <Marker
//                   key={index}
//                   coordinate={{
//                     latitude: hospital.geometry.location.lat,
//                     longitude: hospital.geometry.location.lng,
//                   }}
//                   title={hospital.name}
//                   description={hospital.vicinity}
//                   pinColor="red"
//                 />
//               ) : null
//             )
//           ) : (
//             <Text style={styles.errorText}>No hospitals found nearby.</Text>
//           )}
//         </MapView>
//       ) : (
//         <Text style={styles.errorText}>Could not fetch location.</Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: { flex: 1 },
//   errorText: { textAlign: "center", fontSize: 18, marginTop: 20, color: "red" },
// });





import React, { useState, useEffect, useRef } from "react";
import { View, ActivityIndicator, Alert, Text, TouchableOpacity, FlatList, Dimensions } from "react-native";
import * as Location from "expo-location";
import { WebView } from "react-native-webview";

const { width } = Dimensions.get("window"); // Get screen width for responsive design

export default function NearbyHealthcareCenters() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Allow location access to see nearby healthcare centers.");
        setLoading(false);
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });

      setLoading(false);
    })();
  }, []);

  // Healthcare & Other Amenities Filters
  const amenityCategories = [
    { key: "all", label: "All Centers" },
    { key: "hospital", label: "Hospitals" },
    { key: "clinic", label: "Clinics" },
    { key: "dental", label: "Dental Centers" },
    { key: "pharmacy", label: "Pharmacies" },
    { key: "specialized", label: "Specialized Centers" },
    { key: "ambulance", label: "Ambulance Services" },
    { key: "emergency", label: "Emergency Rooms" },
    { key: "therapy", label: "Therapy Centers" },
    { key: "rehabilitation", label: "Rehabilitation Centers" },
  ];

  // HTML & JavaScript for Map Display (Using Leaflet)
  const mapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          #map { height: 100vh; width: 100vw; }
        </style>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"></script>
        <script>
          document.addEventListener("DOMContentLoaded", function() {
            var userLat = ${location?.latitude || 0};
            var userLng = ${location?.longitude || 0};

            var map = L.map('map').setView([userLat, userLng], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            L.marker([userLat, userLng]).addTo(map)
              .bindPopup("You are here")
              .openPopup();

            var healthcareMarkers = [];

            function fetchHealthcareCenters(filter) {
              healthcareMarkers.forEach(marker => map.removeLayer(marker));
              healthcareMarkers = [];

              const filterMap = {
                "all": "",
                "hospital": "hospital",
                "clinic": "clinic",
                "dental": "dental",
                "pharmacy": "pharmacy",
                "ambulance": "ambulance_station",
                "emergency": "emergency",
                "therapy": "therapy",
                "rehabilitation": "rehabilitation"
              };

              const filterQuery = filterMap[filter] || "";

              fetch(\`https://overpass-api.de/api/interpreter?data=[out:json];
                node[amenity=hospital](around:5000,\${userLat},\${userLng});
                node[amenity=clinic](around:5000,\${userLat},\${userLng});
                node[amenity=dental](around:5000,\${userLat},\${userLng});
                node[amenity=pharmacy](around:5000,\${userLat},\${userLng});
                node[amenity=ambulance_station](around:5000,\${userLat},\${userLng});
                node[amenity=emergency](around:5000,\${userLat},\${userLng});
                node[amenity=therapy](around:5000,\${userLat},\${userLng});
                node[amenity=rehabilitation](around:5000,\${userLat},\${userLng});
                out;\`)
                .then(response => response.json())
                .then(data => {
                  data.elements.forEach(center => {
                    if (center.lat && center.lon) {
                      let centerType = center.tags.amenity || "general";

                      // Match the selected filter with the correct amenity type
                      if (!filter || filter === "all" || centerType === filterQuery) {
                        let marker = L.marker([center.lat, center.lon])
                          .addTo(map)
                          .bindPopup(center.tags.name || "Unnamed Center");
                        healthcareMarkers.push(marker);
                      }
                    }
                  });
                })
                .catch(error => console.error("Error fetching healthcare centers:", error));
            }

            fetchHealthcareCenters("${selectedFilter}");

            window.addEventListener("message", (event) => {
              if (event.data && event.data.filter) {
                fetchHealthcareCenters(event.data.filter);
              }
            });
          });
        </script>
      </head>
      <body>
        <div id="map"></div>
      </body>
    </html>
  `;

  // Function to update filter and send data to WebView
  const updateFilter = (filter: string) => {
    setSelectedFilter(filter);
    webViewRef.current?.injectJavaScript(`window.postMessage({ filter: "${filter}" }, "*");`);
  };

  return (
    <View style={{ flex: 1, marginBottom:65 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={{ flex: 1, justifyContent: "center" }} />
      ) : location ? (
        <>
          {/* Map Display */}
          <WebView
            ref={webViewRef}
            originWhitelist={["*"]}
            source={{ html: mapHtml }}
            style={{ flex: 1 }}
            injectedJavaScript={`window.postMessage({ filter: "${selectedFilter}" }, "*");`}
          />

          {/* Fixed Filter Panel */}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              backgroundColor: "white",
              paddingVertical: 15,
              paddingHorizontal: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.25,
              shadowRadius: 5,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>
              Filter Healthcare Centers
            </Text>
            <FlatList
              data={amenityCategories}
              keyExtractor={(item) => item.key}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    backgroundColor: selectedFilter === item.key ? "#3867a1" : "#ddd",
                    padding: 15,
                    borderRadius: 8,
                    marginHorizontal: 10,
                  }}
                  onPress={() => updateFilter(item.key)}
                >
                  <Text
                    style={{
                      color: selectedFilter === item.key ? "white" : "black",
                      fontSize: 16,
                    }}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </>
      ) : (
        <Text style={{ textAlign: "center", fontSize: 18, marginTop: 20, color: "red" }}>
          Could not fetch location.
        </Text>
      )}
    </View>
  );
}
