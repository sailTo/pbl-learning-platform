package com.SuperNova;

import com.SuperNova.core.ResultGenerator;
import com.SuperNova.dao.FileMapper;
import com.SuperNova.dao.GradeSystemMapper;
import com.SuperNova.dao.StudentAssignmentMapper;
import com.SuperNova.model.*;
import com.SuperNova.service.AssignmentService;
import com.SuperNova.service.CourseService;
import com.SuperNova.service.ProjectService;
import com.alibaba.fastjson.JSONObject;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import javax.annotation.Resource;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ServiceTest extends Tester {
    @Resource
    private CourseService courseService;
    @Resource
    private AssignmentService assignmentService;
    @Resource
    private ProjectService projectService;
    @Resource
    private FileMapper fileMapper;
    @Resource
    private StudentAssignmentMapper studentAssignmentMapper;
    @Resource
    private GradeSystemMapper gradeSystemMapper;

    @Test
    public void test1(){
        Course course = courseService.findById(1);
        Assert.assertEquals(course.getC_name(),"Ad_web");
    }
    @Test
    @Rollback(false)
    public void test3(){
        Object res = assignmentService.searchDoneStatus(1,"S001");
//        Assert.assertEquals("Ad_web",course.getc_name());
        System.out.println(res);
    }

    @Test
    public void test2(){
        Object str = assignmentService.searchDoneStatus(1,"S001");
//        String str = assignmentService.searchAssignmentUrge(1,"S001");
        System.out.println(str);
//        Assert.assertEquals(course.getc_name(),"Ad_web");
    }

    @Test
    public void test5(){
        int res = projectService.studentCoursePID("S001",1);
        Assert.assertEquals(1,res);
//        Assert.assertEquals(course.getc_name(),"Ad_web");
    }

    @Test
    public void test4(){
//        String str = projectService.searchGroupers(1);
        System.out.println("pid=1: "+fileMapper.searchMaxId(1));
        System.out.println("pid=2: "+fileMapper.searchMaxId(2));
//        Assert.assertEquals(course.getc_name(),"Ad_web");
    }

    @Test
    public void test6(){
//        String str = projectService.searchGroupers(1);

        System.out.println(ResultGenerator.genSuccessResult(courseService.getMyCourses("S001",1,8)));
//        System.out.println("pid=2: "+fileMapper.searchMaxId(2));
//        Assert.assertEquals(course.getc_name(),"Ad_web");
    }

    @Test
    public void test7(){
//        String str = projectService.searchGroupers(1);
        JSONObject data = new JSONObject();
        data.put("groupers",projectService.searchGroupers(2));
        data.put("leader",projectService.searchLeader(2));
        System.out.println(ResultGenerator.genSuccessResult(data));
//        System.out.println("pid=2: "+fileMapper.searchMaxId(2));
//        Assert.assertEquals(course.getc_name(),"Ad_web");
    }

    @Test
    public void tset8()throws ParseException {
        List<Assignment> assignments = new ArrayList<>();
        Assignment assignment1 = new Assignment();
        assignment1.setP_id(1);
        assignment1.setA_description("Test1");
        assignment1.setA_name("Test1");
        DateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
        Date myDate1 = dateFormat1.parse("2009-06-01");
        assignment1.setA_start_date(myDate1);
        Date myDate2 = dateFormat1.parse("2009-06-02");
        assignment1.setA_start_date(myDate2);
        assignment1.setImportance(5);

        Assignment assignment2 = new Assignment();
        assignment2.setP_id(1);
        assignment2.setA_description("Test2");
        assignment2.setA_name("Test2");
        Date myDate3 = dateFormat1.parse("2010-06-01");

        assignment2.setA_start_date(myDate3);
        Date myDate4 = dateFormat1.parse("2010-07-01");
        assignment2.setA_start_date(myDate4);
        assignment2.setImportance(5);

        assignments.add(assignment1);
        assignments.add(assignment2);
        System.out.println(assignmentService.createAssignments(assignments));
        System.out.println(studentAssignmentMapper.searchDoneStatus(1,"S001"));
        courseService.joinCourse(1,"S123");
        projectService.joinProject(1,"S123");
        System.out.println(studentAssignmentMapper.searchDoneStatus(1,"S123"));

//        System.out.println(assignmentService.searchAssignment(1));
    }

    @Test
    public void test9(){
        Project project = new Project();
        project.setC_id(1);
        project.setDescription("Test");
        project.setP_name("测试");
//        project.setGrading_status(false);
        project.setMutual_grade_ratio(25.0);
        project.setSelf_grade_ratio(25.0);
        project.setTeacher_grade_ratio(50.0);

        List<GradeSystem> gradeSystems = new ArrayList<>();
        GradeSystem gradeSystem = new GradeSystem();
        gradeSystem.setDescription("测试");
        gradeSystem.setMax_grade(10.0);
        gradeSystems.add(gradeSystem);


        int p_id = projectService.addProject(project,gradeSystems);
        System.out.println(p_id);
        System.out.println(projectService.searchProject(1));
        GradeSystem tmp = new GradeSystem();
        tmp.setP_id(p_id);
        System.out.println(gradeSystemMapper.select(tmp).get(0).getDescription());
    }
}
