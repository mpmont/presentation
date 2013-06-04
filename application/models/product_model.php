<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Product_Model extends CI_Model {

    public function get( $id )
    {
        $q = $this->db->query('');
        return $q->result();
    }

}

/* End of file product_Model.php */
/* Location: ./application/models/product_Model.php */