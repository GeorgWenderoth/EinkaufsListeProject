package com.adorsys.demo;


import com.adorsys.demo.EinkaufElement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface EinkaufRepository extends JpaRepository<EinkaufElement, Long> { //Long
        Optional<EinkaufElement> findByItId(int id); // findByItId, es muss genauso heißen wie der Propertiename, also findByElementID geht nicht, No Property Found for Type
        List<EinkaufElement> findAllByStrich(boolean strich);
        void deleteEinkaufElementsByStrichIsTrue();

}
