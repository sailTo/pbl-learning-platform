package com.SuperNova.model;

import javax.persistence.*;

public class File {
    @Id
    private String ids;

//    @Id
    @Column(name = "f_id")
    private Integer f_id;

//    @Id
    @Column(name = "p_id")
    private Integer p_id;

    @Column(name = "u_id")
    private String u_id;

    @Column(name = "f_name")
    private String f_name;

    @Column(name = "file_URL")
    private String file_URL;

    private String description;

    /**
     * @return f_id
     */
    public Integer getf_id() {
        return f_id;
    }

    /**
     * @param f_id
     */
    public void setf_id(Integer f_id) {
        this.f_id = f_id;
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
     * @return u_id
     */
    public String getu_id() {
        return u_id;
    }

    /**
     * @param u_id
     */
    public void setu_id(String u_id) {
        this.u_id = u_id;
    }

    /**
     * @return f_name
     */
    public String getf_name() {
        return f_name;
    }

    /**
     * @param f_name
     */
    public void setf_name(String f_name) {
        this.f_name = f_name;
    }

    /**
     * @return file_URL
     */
    public String getfile_URL() {
        return file_URL;
    }

    /**
     * @param file_URL
     */
    public void setfile_URL(String file_URL) {
        this.file_URL = file_URL;
    }

    /**
     * @return description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description
     */
    public void setDescription(String description) {
        this.description = description;
    }
}