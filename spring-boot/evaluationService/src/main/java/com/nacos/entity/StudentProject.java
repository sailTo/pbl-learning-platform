package com.nacos.entity;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "student_project")
public class StudentProject {
    @Id
    @Column(name = "u_id")
    private String u_id;

    @Id
    @Column(name = "p_id")
    private Integer p_id;

    @Column(name = "is_group_leader")
    private Boolean is_group_leader;

    @Column(name = "self_grade")
    private Double self_grade;

    @Column(name = "mutual_grade")
    private Double mutual_grade;

    @Column(name = "teacher_grade")
    private Double teacher_grade;

    /**
     * @return u_id
     */
    public String getU_id() {
        return u_id;
    }

    /**
     * @param s_id
     */
    public void setU_id(String s_id) {
        this.u_id = s_id;
    }

    /**
     * @return p_id
     */
    public Integer getP_id() {
        return p_id;
    }

    /**
     * @param p_id
     */
    public void setP_id(Integer p_id) {
        this.p_id = p_id;
    }

    /**
     * @return is_group_leader
     */
    public Boolean getIs_group_leader() {
        return is_group_leader;
    }

    /**
     * @param is_group_leader
     */
    public void setIs_group_leader(Boolean is_group_leader) {
        this.is_group_leader = is_group_leader;
    }

    /**
     * @return self_grade
     */
    public Double getSelf_grade() {
        return self_grade;
    }

    /**
     * @param self_grade
     */
    public void setSelf_grade(Double self_grade) {
        this.self_grade = self_grade;
    }

    /**
     * @return mutual_grade
     */
    public Double getMutual_grade() {
        return mutual_grade;
    }

    /**
     * @param mutual_grade
     */
    public void setMutual_grade(Double mutual_grade) {
        this.mutual_grade = mutual_grade;
    }

    /**
     * @return teacher_grade
     */
    public Double getTeacher_grade() {
        return teacher_grade;
    }

    /**
     * @param teacher_grade
     */
    public void setTeacher_grade(Double teacher_grade) {
        this.teacher_grade = teacher_grade;
    }
}