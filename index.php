<?php

$method = $_GET['method'];
$video = $_GET['video'];

$dbh = new PDO('mysql:host=localhost;dbname=danmu', 'root', 'love520...');

if ($method === 'get') {

    $timerStart = $_GET['time'] + 0;
    $timerEnd   = $timerStart + 1;

    $res = $dbh->prepare('SELECT * FROM three WHERE `time` >= :timerStart && `time` <= :timerEnd');

    $res->bindParam(':timerStart', $timerStart);
    $res->bindParam(':timerEnd',   $timerEnd);

    $res->execute();

    while ($row = $res->fetchAll()) {

        json_encode($row);

        echo json_encode($row);

    }
} else if ($method === 'post') {
    $danmu = $_GET['danmu'];
    $time = $_GET['time'];
    $res = $dbh->prepare('INSERT INTO three(id, pid, danmu, `time`) values(null, 0, :danmu, :timer)');
    $res->bindParam(':danmu', $danmu);
    $res->bindParam(':timer', $time);
    $res->execute();

}

