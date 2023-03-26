package com.example.maxim_pj.controller;

import com.example.maxim_pj.service.MainService;
import com.example.maxim_pj.vos.ProductVO;
import com.fasterxml.jackson.databind.util.JSONPObject;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.util.List;

@Log4j2
@Controller
public class MainController {
    @Autowired
    MainService mainService;

    @GetMapping("/")
    public String init(){
        return "redirect:/main";
    }

    @GetMapping("/main")
    public void main(){}

    @GetMapping("/about")
    public void about(){}

    @GetMapping("/product")
    public void product(){};

    @GetMapping("/news")
    public void news(){}

    @GetMapping("/newsPage/{num}")
    public String newsPage(
            @PathVariable int num,
            Model model
    ){
        model.addAttribute("num", (num-1));
        return "newsPage";
    }
}
