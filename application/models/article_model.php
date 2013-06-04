<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Article_Model extends CI_Model {

    public function get_all()
    {
        $q = $this->db->get('articles');
        return $q->result();
    }

    public function get( $id = null )
    {
        $this->db->where('id', $id);
        $q = $this->db->get('articles');
        return $q->row();
    }

}

/* End of file articles_Model.php */
/* Location: ./application/models/articles_Model.php */