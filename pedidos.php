<?php
// Guardar en: C:\xampp\htdocs\huerta-magica\api\pedidos.php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');          // en producción pon tu dominio
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit('{"ok":false}'); }

$d = json_decode(file_get_contents('php://input'), true);
$cliente = trim($d['cliente'] ?? '');
$total = (float)($d['total'] ?? 0);
$pago = in_array($d['metodo_pago'] ?? '', ['QR','Efectivo'], true) ? $d['metodo_pago'] : '';
if ($cliente === '' || mb_strlen($cliente) > 120 || $total <= 0 || !$pago || !is_array($d['detalle'] ?? null)) {
  http_response_code(400); exit('{"ok":false,"error":"datos invalidos"}');
}
try {
  $db = new PDO('mysql:host=localhost;dbname=huerta_magica;charset=utf8mb4', 'root', '', // XAMPP: root sin clave
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
  $db->prepare('INSERT INTO pedidos (cliente, detalle, total, metodo_pago) VALUES (?,?,?,?)')
     ->execute([$cliente, json_encode($d['detalle'], JSON_UNESCAPED_UNICODE), $total, $pago]);
  echo '{"ok":true}';
} catch (Throwable $e) { http_response_code(500); echo '{"ok":false}'; }
