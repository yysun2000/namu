<?
session_start();
$key = $_GET['key'];
$value = $_GET['value'];
$_SESSION[$key] = $value;
?>