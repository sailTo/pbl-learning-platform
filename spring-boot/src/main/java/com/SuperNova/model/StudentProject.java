package com.SuperNova.model;

import javax.persistence.*;

@Table(name = "student_project")
public class StudentProject {
    @Id
    @Column(name = "s_id")
    private String s_id;

    @Id
    @Column(name = "p_id")
    private Integer p_id;

    @Column(name = "is_group_leader")
    private Boolean is_group_leader;

    @Column(name = "self_grade")
    private Integer self_grade;

    @Column(name = "mutual_grade")
    private Integer mutual_grade;

    @Column(name = "teacher_grade")
    private Integer teacher_grade;

    /**
     * @return s_id
     */
    public String gets_id() {
        return s_id;
    }

    /**
     * @param s_id
     */
    public void sets_id(String s_id) {
        this.s_id = s_id;
    }

    /**
     * @return p_id
     */
    public Integer getp_id() {
        return p_id;
    }

    /**
     * @param p_id
     */
    public void setp_id(Integer p_id) {
        this.p_id = p_id;
    }

    /**
     * @return is_group_leader
     */
    public Boolean getis_group_leader() {
        return is_group_leader;
    }

    /**
     * @param is_group_leader
     */
    public void setis_group_leader(Boolean is_group_leader) {
        this.is_group_leader = is_group_leader;
    }

    /**
     * @return self_grade
     */
    public Integer getself_grade() {
        return self_grade;
    }

    /**
     * @param self_grade
     */
    public void setself_grade(Integer self_grade) {
        this.self_grade = self_grade;
    }

    /**
     * @return mutual_grade
     */
    public Integer getmutual_grade() {
        return mutual_grade;
    }

    /**
     * @param mutual_grade
     */
    public void setmutual_grade(Integer mutual_grade) {
        this.mutual_grade = mutual_grade;
    }

    /**
     * @return teacher_grade
     */
    public Integer getteacher_grade() {
        return teacher_grade;
    }

    /**
     * @param teacher_grade
     */
    public void setteacher_grade(Integer teacher_grade) {
        this.teacher_grade = teacher_grade;
    }
}