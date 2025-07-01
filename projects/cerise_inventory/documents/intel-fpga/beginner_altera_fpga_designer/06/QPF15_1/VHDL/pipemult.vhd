--*****************************************************************************
--                                                                            *
--                  Copyright (C) 2009 Altera Corporation                     *
--                                                                            *
-- ALTERA, ARRIA, CYCLONE, HARDCOPY, MAX, MEGACORE, NIOS, QUARTUS & STRATIX   *
-- are Reg. U.S. Pat. & Tm. Off. and Altera marks in and outside the U.S.     *
--                                                                            *
-- All information provided herein is provided on an "as is" basis,           *
-- without warranty of any kind.                                              *
--                                                                            *
-- Module Name: pipemult                        File Name: pipemult.vhd       *
--                                                                            *
-- Module Function: This file contains the top level module for the pipemult  *
--                  project.                                                  *
--                                                                            *
-- REVISION HISTORY:                                                          *
--  Revision 1.0    12/07/2009 - Initial release                              *
--*****************************************************************************

LIBRARY ieee;
USE ieee.std_logic_1164.all; 

LIBRARY work;

ENTITY pipemult IS 
   port	(
         clk1      :  IN   STD_LOGIC;
         wren      :  IN   STD_LOGIC;
	 dataa     :  IN   STD_LOGIC_VECTOR( 7 downto 0);
	 datab     :  IN   STD_LOGIC_VECTOR( 7 downto 0);
	 rdaddress :  in   STD_LOGIC_VECTOR( 4 downto 0);
	 wraddress :  IN   STD_LOGIC_VECTOR( 4 downto 0);
	 q         :  OUT  STD_LOGIC_VECTOR(15 downto 0)
	);
END pipemult;

ARCHITECTURE bdf_type OF pipemult IS 

-- Insert multiplier component declaration here

component ram
   PORT	(
         clock      : in  STD_LOGIC;
         data       : in  STD_LOGIC_VECTOR (15 DOWNTO 0);
         rdaddress  : in  STD_LOGIC_VECTOR (4 DOWNTO 0);
         wraddress  : in  STD_LOGIC_VECTOR (4 DOWNTO 0);
         wren	    : IN  STD_LOGIC  := '1';
         q	    : OUT STD_LOGIC_VECTOR (15 DOWNTO 0)
         );
end component;

signal	mult_to_ram, ram_out :  STD_LOGIC_VECTOR(15 downto 0);


BEGIN 


-- Insert multipler instantiation here


ram_inst : ram
PORT MAP(clock => clk1,
		 wren => wren,
		 data => mult_to_ram,
		 rdaddress => rdaddress,
		 wraddress => wraddress,
		 q => ram_out);
		
out_proc : PROCESS (clk1)
	BEGIN
		IF rising_edge (clk1) THEN
			q <= ram_out;
		END IF;
	END PROCESS out_proc;

END; 
