package com.example.spring.yosyu;

import java.util.ArrayList;
import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class MainController {

	@RequestMapping("/")
	public String home() {
		return "hello";
	}

	@RequestMapping("/top")
	public String top(Model model) {

		model.addAttribute("empName2", "niente");
		model.addAttribute("price2", 444);
		model.addAttribute("empName3", "oto");
		model.addAttribute("price3", 555);
		return "graph";
	}

	@RequestMapping("/getData")
	@ResponseBody
	public String getEmpData(Model model) {

		List<Employee> empList = createEmpData(5);
		return getJsonEmpList(empList);
	}

	@RequestMapping("/getData2")
	@ResponseBody
	public String getEmpData2(Model model) {

		List<Employee> empList = createEmpData(10);
		return getJsonEmpList(empList);
	}

	@RequestMapping("/contract/add/input")
	public String contractAddInput(Model model) {

		List<Customer> cusList = createCustomerData(10);
		model.addAttribute("customerList", cusList);
		return "/contract/add/contract_add_input";
	}
	
	@RequestMapping("/getCustomerData/{customerId}")
	@ResponseBody
	public String searchCustomerDataWithId(@PathVariable String customerId, Model model) {

		System.out.println("id:"+customerId);
		Customer cus = new Customer();
		cus.setCustomerId(Integer.parseInt(customerId));
		cus.setCustomerName("name:"+customerId);
		
		List<Customer> cusList = new ArrayList<>();
		cusList.add(cus);
		return getJsonCusList(cusList);
	}

	private static String getJsonEmpList(List<Employee> employees) {
		String retVal = null;
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			retVal = objectMapper.writeValueAsString(employees);
		} catch (JsonProcessingException e) {
			System.err.println(e);
		}
		return retVal;
	}
	
	private static String getJsonCusList(List<Customer> employees) {
		String retVal = null;
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			retVal = objectMapper.writeValueAsString(employees);
		} catch (JsonProcessingException e) {
			System.err.println(e);
		}
		return retVal;
	}

	public List<Employee> createEmpData(int datas) {
		List<Employee> empList = new ArrayList<>();

		for (int i = 0; i < datas; i++) {
			Employee emp = new Employee();
			emp.setEmpName("name:" + i);
			emp.setPrice(i);
			empList.add(emp);
		}

		return empList;
	}
	
	public List<Customer> createCustomerData(int datas) {
		List<Customer> customerList = new ArrayList<>();

		for (int i = 0; i < datas; i++) {
			Customer cus = new Customer();
			cus.setCustomerId(i);;
			cus.setCustomerName("name:"+i);
			customerList.add(cus);
		}

		return customerList;
	}
}
