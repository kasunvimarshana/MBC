<?php
    //https://reactnativecode.com/infinite-list-flatlist-pagination-load-more-data/
?>


<?php
    //Define your host here.
    $HostName = "localhost";
    //Define your database name here.
    $DatabaseName = "id2070055_reactnativedb";
    //Define your database username here.
    $HostUser = "id2070055_reactnativedb_user";
    //Define your database password here.
    $HostPass = "1234567890";
?>

<?php
    include 'DBConfig.php';
    // Create connection
    $con = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
    // Getting page from URL.
    $page = $_GET['page'];
    // Show data from first row means 0 row.
    $start = 0;
    // Setting up data items limit, means it will only show only 10 items once.
    $stop = 10; 
    // counting all the items present inside table.
    $all_rows = mysqli_num_rows(mysqli_query($con, "SELECT id from Chart"));
    $page_limit = $all_rows/$stop; 
    // If page is more than the limit it will show a error message.
    if($page<=$page_limit){
        $start = ($page - 1) * $stop; 
        $sql = "SELECT * from Chart limit $start, $stop";
        $result = mysqli_query($con,$sql); 
        $res = array(); 
        while($row = mysqli_fetch_array($result)){
            array_push($res, array("id"=>$row['id'], "value"=>$row['value']));
        }
        $json = json_encode($res); 
        echo $json ;
    } else {
        echo '[{"value": "No Result Found"}]' ;
    }
    $con->close();
?>