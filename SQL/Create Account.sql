CREATE TYPE EmployerList
AS TABLE
(
	employerID UNIQUEIDENTIFIER DEFAULT NEWID(),
	name VARCHAR(20),
	incomeType int,
	netPay float,
	freq int,
	dayOfWeek int,
	dayOfMonth1 int,
	dayOfMonth2 int,
	month1 int,
	month2 int,
	periodStart date
)


CREATE TYPE EnvelopeList
AS TABLE
(
	name VARCHAR(30),
	envelopeType int,
	amount float
)



Create Proc CreateAccount
(
	--Users Table
	@fname VARCHAR(30),
	@lname VARCHAR(30),
	@email VARCHAR(30),
	@pword VARCHAR(30),
	@employerList AS EmployerList READONLY,
	@envelopeList AS EnvelopeList READONLY
)
AS
BEGIN
	SET NOCOUNT ON
	DECLARE @userID uniqueidentifier
	SET @userID = NEWID()

	INSERT INTO Users
	VALUES (@userID, @fname, @lname, @email, @pword)

	INSERT INTO Employers
	SELECT employerID, name, incomeType, netPay, @userID
	FROM @employerList

	INSERT INTO Envelopes
	SELECT name, envelopeType, amount, @userID
	FROM @envelopeList

	INSERT INTO Period
	(Frequency, DayOfWeek, DayOfMonth1, DayOfMonth2, Month1, Month2, PeriodStart, EmployerID)
	SELECT freq, dayOfWeek, dayOfMonth1, dayOfMonth2, month1, month2, periodStart, employerID
	FROM @employerList
END

select * from Employers
select * from Period
select * from Users
select * from Envelopes

delete Employers
delete Period
delete Users
delete Envelopes

create table Envelopes
(
	EnvelopeID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
	Name VARCHAR(30) NOT NULL,
	EnvelopeType int NOT NULL,
	Amount float NOT NULL,
	UserID UNIQUEIDENTIFIER NOT NULL,
	FOREIGN KEY (UserID) REFERENCES Users(ID)
)

drop table envelopes

alter table Period
ADD CONSTRAINT FK_Period_EmployerID FOREIGN KEY (EmployerID) REFERENCES Employers(EmployerID)

ALTER TABLE Period
ADD EnvelopeID UNIQUEIDENTIFIER null,
FOREIGN KEY (EnvelopeID) REFERENCES Envelopes(EnvelopeID)


