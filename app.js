let map;
let marker;
let autocomplete;
let selectedLocation = null;

function initMap() {
    // Create a basic map centered on a default location
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 2,
    });

    // Initialize the autocomplete functionality
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("location-input"),
        {
            types: ["geocode"],
            fields: ["geometry", "name", "formatted_address"],
        }
    );

    // When a place is selected from the dropdown
    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17); // Why 17? Because it looks good.
        }

        // Clear any existing marker
        if (marker) {
            marker.setMap(null);
        }

        // Create a new marker at the selected location
        marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            title: place.name,
        });

        // Store the selected location details
        selectedLocation = {
            name: place.name,
            address: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        };

        // Display location details
        document.getElementById("location-details").innerHTML = `
            <h3>${place.name}</h3>
            <p>${place.formatted_address}</p>
            <p>Latitude: ${place.geometry.location.lat()}</p>
            <p>Longitude: ${place.geometry.location.lng()}</p>
        `;
    });

    // Handle the save location button click
    document.getElementById("save-location").addEventListener("click", () => {
        if (selectedLocation) {
            // Here you would typically send this data to your server
            alert(`Location saved: ${selectedLocation.name}`);
            console.log("Location to save:", selectedLocation);
            
            // You can send this data to your backend using AJAX/fetch
            // Example:
            /*
            fetch('/api/save-location', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedLocation),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            */
        } else {
            alert("Please select a location first");
        }
    });
}