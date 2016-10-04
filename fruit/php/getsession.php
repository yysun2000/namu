<?
session_start();
$key = $_GET['key'];
echo $_SESSION[$key];
?>