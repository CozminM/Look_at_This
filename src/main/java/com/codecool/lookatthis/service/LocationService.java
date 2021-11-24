package com.codecool.lookatthis.service;

import com.codecool.lookatthis.models.Location;
import com.codecool.lookatthis.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocationService {

    LocationRepository locationRepository;

    @Autowired
    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    public void addLocation(Location location) {
        locationRepository.save(location);
    }

    public Location getLocationById(Long id) {
        return locationRepository.getById(id);
    }

    public void updateLocationById(Long id, Location updatedLocation) {
        Location location;
        Optional<Location> optional = locationRepository.findById(id);
        if (optional.isPresent()) {
            location = optional.get();

            location.setTitle(updatedLocation.getTitle());
            location.setMessage(updatedLocation.getMessage());
            location.setImageData(updatedLocation.getImageData());

            locationRepository.save(location);
        }
    }

    public void deleteById(Long id) {
        locationRepository.deleteById(id);
    }

    public List<Location> getAllOrderedByTitleAsc() {
        return locationRepository.findAllByOrderByTitleAsc();
    }

    public List<Location> getAllOrderedByTitleDesc() {
        return locationRepository.findAllByOrderByTitleDesc();
    }

    public List<Location> getAllBySearch(String text) {
        List<Location> locationsByTitle = locationRepository.findAllByTitleContaining(text);
        List<Location> locationsByMessage = locationRepository.findAllByMessageContaining(text);
        List<Location> resultingLocations;

        for (Location location : locationsByTitle){
            if (!locationsByMessage.contains(location))
                locationsByMessage.add(location);
        }
        resultingLocations = locationsByMessage;

        return resultingLocations;
    }


}